const terminal = document.getElementById("terminal");
let currentInput;

window.addEventListener("DOMContentLoaded", () => {
  const terminal = document.getElementById("terminal");
  terminal.classList.add("fade-in");
});

const commands = {
  help: () => {
    printLines(["help : untuk apa?", "about : informasi tentang diriku", "contact : hubungi saya", "clear : menghapus semua history di terminal"]);
  },
  about: () => {
    printLines([
      "Hello, I'm Aprilyan Candra Utama, usually my friends call me Iyan, my school is at Smk Muhammadiyah 1 Sukoharjo, here I major in Rpl/PPLG (software and game development)",
      "","","",
      "My current focus is to become a front end developer, for that I continue to hone my skills in this field '.' ",
    ]);
  },
  contact: () => {
    printLine('GitHub : <a href="https://github.com/yanrieru" target="_blank" style="color:#00ccff; text-decoration:underline;">yanrieru</a>');
    printLine('Instagram : <a href="https://www.instagram.com/iyannfs__/?igsh=enB4NGFobWNnZWhi" target="_blank" style="color:#ff66cc; text-decoration:underline;">iyannfs_</a>');
    // printLines(["Instagram  : https://www.instagram.com/iyannfs__/?igsh=enB4NGFobWNnZWhi", "GitHub : https://github.com/yanrieru"]);
  },
  clear: () => {
    terminal.innerHTML = "";
    initTerminal();
  },
};

function printLine(html = "") {
  const line = document.createElement("div");
  line.className = "line";
  line.innerHTML = html;
  terminal.appendChild(line);
}

function printLines(lines = []) {
  lines.forEach((line) => printLine(line));
}

function addNewInputLine() {
  const line = document.createElement("div");
  line.className = "line";
  line.innerHTML = `
    <span class="prompt">guest@yanrieru-web:~$</span>
    <input class="input" type="text" autofocus />
    <span class="cursor"></span>
  `;
  terminal.appendChild(line);
  currentInput = line.querySelector("input");
  currentInput.focus();
  currentInput.addEventListener("keydown", handleCommand);
  terminal.scrollTop = terminal.scrollHeight;
}

function handleCommand(e) {
  if (e.key === "Enter") {
    const cmd = currentInput.value.trim();
    const userInput = document.createElement("div");
    userInput.className = "line";
    userInput.innerHTML = `<span class="prompt">guest@yanrieru-web:~$</span> ${cmd}`;
    terminal.insertBefore(userInput, currentInput.parentElement);
    currentInput.removeEventListener("keydown", handleCommand);
    currentInput.parentElement.remove();

    if (commands[cmd]) {
      commands[cmd]();
      if (cmd !== "clear") {
        addNewInputLine();
      }
    } else {
      printLine(`Command not found: ${cmd}`);
      addNewInputLine(); // tetap tambahkan prompt kalau command tidak ditemukan
    }
  }
}

function initTerminal() {
  printLines(["Welcome to my personal website👋.", "Type 'help' to see the list of available commands.", ""]);
  addNewInputLine();
}

initTerminal();
