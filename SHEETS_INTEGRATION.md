# 🔗 Integração do Formulário Ápice com a Planilha Google

A planilha já está pronta:  
<https://docs.google.com/spreadsheets/d/1AnzC1iGWSa1r24iZLMk7taEmxHRRjndJ97C6l_GkbSY/edit>

Tem **10 colunas** na aba **`Página1`**, nesta ordem:

| Coluna | Cabeçalho | O que recebe |
|---|---|---|
| A | nome | Nome completo do lead |
| B | email | E-mail |
| C | nùmero | WhatsApp completo com DDI (ex.: `+55 (61) 91234-5678`) |
| D | data de nascimento | DD/MM/AAAA |
| E | ha quanto tempo treina | "Nunca treinou", "0–6 meses", "1–2 anos", etc. |
| F | objetivo principal | "Hipertrofia", "Emagrecimento", … |
| G | historico | Texto livre do lead |
| H | o que voce esperar mudar nos proximos 6 meses | Texto livre do lead |
| I | consultoria | Modalidade escolhida: `Treino Premium` ou `Elite` |
| J | Você está disposto a investir seu tempo… | Resposta do step de compromisso |

> ⚠️ Já existe linha 1 com cabeçalhos — **não precisa criar nada na planilha**. Pule direto pro Passo 1.

---

## Passo 1 — Colar o Apps Script

1. Abra a planilha.
2. Vá em **Extensões → Apps Script**.
3. Apague o conteúdo padrão (`function myFunction() {}`).
4. Cole **todo** o código abaixo:

```javascript
// === Ápice — Recebimento de leads do formulário ===
// Aba alvo (nome exatamente como aparece na barra inferior do Sheets):
const SHEET_NAME = 'Página1';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    // Ordem das colunas A→J da planilha:
    const row = [
      data.nome || '',             // A — nome
      data.email || '',            // B — email
      data.numero || '',           // C — nùmero (DDI + telefone)
      data.data_nascimento || '',  // D — data de nascimento (DD/MM/AAAA)
      data.tempo_treino || '',     // E — ha quanto tempo treina
      data.objetivo || '',         // F — objetivo principal
      data.historico || '',        // G — historico
      data.expectativa || '',      // H — o que voce esperar mudar nos proximos 6 meses
      data.consultoria || '',      // I — consultoria (Treino Premium / Elite)
      data.compromisso || ''       // J — Você está disposto a investir seu tempo...
    ];

    const lastRow = sheet.getLastRow() + 1;
    const range = sheet.getRange(lastRow, 1, 1, row.length);
    // Força a linha inteira como TEXTO — impede que "+55..." seja
    // interpretado como fórmula (corrige o #ERROR! no número).
    range.setNumberFormat('@');
    range.setValues([row]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('Ápice webhook OK');
}
```

5. Clique no **disquete 💾** para salvar. Nome do projeto: `Apice Leads`.

---

## Passo 2 — Implantar como App da Web

1. No topo do Apps Script, clique em **Implantar → Nova implantação**.
2. Clique na **engrenagem ⚙️** ao lado de "Selecionar tipo" → **App da Web**.
3. Preencha:
   - **Descrição**: `Webhook Apice v1`
   - **Executar como**: `Eu mesmo (seu@email.com)`
   - **Quem tem acesso**: `Qualquer pessoa` ⚠️ (sem isso o site **não** consegue gravar)
4. Clique em **Implantar**.
5. Vai pedir permissão:
   - Escolha sua conta
   - Clique em **Avançado** → **Acessar Apice Leads (não seguro)** → **Permitir**  
     (Aviso normal — é um script seu, não verificado pelo Google.)
6. Copie a **URL do App da Web**. Termina em `/exec`, tipo:

```
https://script.google.com/macros/s/AKfycb.................../exec
```

---

## Passo 3 — Colar a URL no site

Abra **`apice-form.jsx`** e troque a linha:

```js
const SHEET_WEBHOOK_URL = 'COLE_AQUI_SUA_URL_DO_APPS_SCRIPT';
```

por:

```js
const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycb..../exec';
```

Salvar — pronto. ✅

---

## Como testar

1. Abra o site e clique em qualquer botão que abre o formulário.
2. Preencha as 3 etapas e clique em **Enviar aplicação →**.
3. Volte para a planilha — a linha nova deve aparecer em segundos no fim da lista.
4. Se não aparecer:
   - Abra o **Console** do navegador (F12) e procure por `[Ápice]`.
   - Vá no Apps Script → **Execuções** (relógio no menu esquerdo) e veja se chegou alguma requisição.

---

## Atualizar o script depois

Se editar o script:

- **Implantar → Gerenciar implantações** → ícone de lápis ✏️ → **Versão: Nova versão** → **Implantar**.
- A **URL continua a mesma** — não precisa trocar nada no site.

---

## Por que `mode: 'no-cors'` no fetch?

O Apps Script aceita `POST` de qualquer origem, mas não devolve cabeçalhos CORS. Como só queremos **gravar** (não ler resposta), o site dispara o POST em `no-cors`, os dados chegam na planilha e o usuário segue para o WhatsApp sem esperar nada.
