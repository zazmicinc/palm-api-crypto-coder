const vscode = require("vscode");
const CodeGenerator = require("./utils/CodeGenerator");

const funProgressTitles = [
  "Magic in the Making...",
  "Cracking the Code Eggs 🥚",
  "Weaving the Code Spells ✨",
  "Turning Code into Gold ✨",
  "Unleashing the Code Genie 🧞",
  "Flipping Code Pancakes 🥞",
  "Sculpting the Digital Clay 🎨",
  "Converting Pixels to Poems ✍️",
  "Cooking up Some Code Delights 🍳",
  "Transforming 1s and 0s 🌌",
];

async function transformCode(selectedText, format) {
  const generatedCode = await CodeGenerator.transformCode(selectedText, format);
  return generatedCode;
}

async function transformCodeFromEditor(format) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return; // No open text editor
  }

  const selection = editor.selection;
  const selectedText = editor.document.getText(selection);

  // Replace the selected text with a new string
  const newText = await transformCode(selectedText, format);
  if (newText === undefined) {
    return;
  }

  // Get the start and end positions of the selection
  const startPosition = selection.start;
  const endPosition = selection.end;

  // Create a TextEditorEdit object to apply the replacement
  const edit = new vscode.TextEdit(
    new vscode.Range(startPosition, endPosition),
    newText
  );

  // Apply the edit to the document
  const workspaceEdit = new vscode.WorkspaceEdit();
  workspaceEdit.set(editor.document.uri, [edit]);
  vscode.workspace.applyEdit(workspaceEdit);
}

async function generateRandomNumber() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return; // No open text editor
  }

  const selection = editor.selection;

  // Get the start and end positions of the selection
  const startPosition = selection.start;
  const endPosition = selection.end;

  const length = 20; // Change this to your desired length
  let randomNumber = '';

  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 10);
    randomNumber += digit;
  }
  // Create a TextEditorEdit object to apply the replacement
  const edit = new vscode.TextEdit(
    new vscode.Range(startPosition, endPosition),
    randomNumber
  );

  // Apply the edit to the document
  const workspaceEdit = new vscode.WorkspaceEdit();
  workspaceEdit.set(editor.document.uri, [edit]);
  vscode.workspace.applyEdit(workspaceEdit);
}

async function generateRandomText() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return; // No open text editor
  }

  const selection = editor.selection;

  // Get the start and end positions of the selection
  const startPosition = selection.start;
  const endPosition = selection.end;

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
  const length = 50;
  let randomText = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters[randomIndex];
  }

  // Create a TextEditorEdit object to apply the replacement
  const edit = new vscode.TextEdit(
    new vscode.Range(startPosition, endPosition),
    randomText
  );

  // Apply the edit to the document
  const workspaceEdit = new vscode.WorkspaceEdit();
  workspaceEdit.set(editor.document.uri, [edit]);
  vscode.workspace.applyEdit(workspaceEdit);
}

function activate(context) {
  function registerCryptoCommand(format) {
    return vscode.commands.registerCommand(`palm-api-crypto-coder.${format}`, async () => {
      const randomTitleIndex = Math.floor(Math.random() * funProgressTitles.length);
      const randomTitle = funProgressTitles[randomTitleIndex];

      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: randomTitle,
          cancellable: true,
        },
        async () => {
          await transformCodeFromEditor(format);
        }
      );
    });
  }

  context.subscriptions.push(registerCryptoCommand("JSON"));
  context.subscriptions.push(registerCryptoCommand("XML"));

  const randomCommand = vscode.commands.registerCommand( "palm-api-crypto-coder.Random", async () => {
  }
  );

  const randomNumberCommand = vscode.commands.registerCommand( "palm-api-crypto-coder.RandomNumber", async () => {
    await generateRandomNumber();
  }
  );
  const randomTextCommand = vscode.commands.registerCommand( "palm-api-crypto-coder.RandomText", async () => {
    await generateRandomText();
  }
  );
  context.subscriptions.push(randomCommand, randomNumberCommand, randomTextCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
