const terminal = document.getElementById("terminal");
let currentInput;

// Fade-in saat halaman load
window.addEventListener("DOMContentLoaded", () => {
  terminal.classList.add("fade-in");
});

// Command list
const commands = {
  help: () => {
    printLines([
      "help   : untuk apa?",
      "about  : informasi tentang diriku",
      "contact: hubungi saya",
      "clear  : menghapus semua history di terminal",
    ]);
  },
  about: () => {
    printLines([
      "Hello, I'm Aprilyan Candra Utama, usually my friends call me Iyan.",
      "My school is at Smk Muhammadiyah 1 Sukoharjo, majoring in RPL/PPLG (software and game development).",
      "",
      "My current focus is to become a front end developer,",
      "for that I continue to hone my skills in this field.",
    ]);
  },
  contact: () => {
    printLine(
      'GitHub   : <a href="https://github.com/yanrieru" target="_blank" style="color:#00ccff; text-decoration:underline;">yanrieru</a>'
    );
    printLine(
      'Instagram: <a href="https://www.instagram.com/iyannfs__/?igsh=enB4NGFobWNnZWhi" target="_blank" style="color:#ff66cc; text-decoration:underline;">iyannfs_</a>'
    );
  },
  clear: () => {
    terminal.innerHTML = "";
    initTerminal();
  },
};

// Utility untuk print ke terminal
function printLine(html = "") {
  const line = document.createElement("div");
  line.className = "line fade in";
  line.innerHTML = html;
  terminal.appendChild(line);
}

function printLines(lines = []) {
  lines.forEach((line) => printLine(line));
}

// Tambahkan input prompt baru
function addNewInputLine() {
  const line = document.createElement("div");
  line.className = "line fade in";
  line.innerHTML = `
    <span class="prompt">guest@yanrieru-web: ~ $</span>
    <input class="input" type="text" autofocus />
    <span class="cursor"></span>
  `;
  terminal.appendChild(line);

  currentInput = line.querySelector("input");
  currentInput.focus();
  currentInput.addEventListener("keydown", handleCommand);

  terminal.scrollTop = terminal.scrollHeight;
}

// Handle command
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
      if (cmd !== "clear") addNewInputLine();
    } else {
      printLine(`Command not found: ${cmd}`);
      addNewInputLine();
    }
  }
}

// ====== ASCII typing banner ======
function typeAsciiBanner(
  text,
  { font = "Standard", charDelay = 0, lineDelay = 5 } = {}
) {
  return new Promise((resolve) => {
    const pre = document.createElement("pre");
    pre.className = "ascii";
    terminal.appendChild(pre);

    const render = () => {
      figlet.text(text, { font }, (err, data) => {
        if (err || !data) {
          pre.textContent = text;
          return resolve();
        }
        const lines = data.split("\n");
        let i = 0,
          j = 0;

        function tick() {
          if (i >= lines.length) return resolve();
          const line = lines[i];

          if (j < line.length) {
            pre.textContent += line[j];
            j++;
            setTimeout(tick, charDelay);
          } else {
            pre.textContent += "\n";
            i++;
            j = 0;
            setTimeout(tick, lineDelay);
          }
        }
        tick();
      });
    };

    if (font !== "Standard") {
      const url = "./fonts"; // sesuai folder kamu
      figlet.loadFont(font, (err) => {
        if (err) {
          console.error("Gagal load font, fallback ke Standard", err);
          font = "Standard";
        }
        render();
      });
    } else {
      render();
    }
  });
}

// Init terminal
async function initTerminal() {
  await typeAsciiBanner("Aprilyan Candra Utama", {
    font: "BigMoney-ne",
    charDelay: 0,
    lineDelay: 5,
  });

  printLines([
    "",
    "Welcome to my terminal portfolio👋.",
    "Here you can get some information about me.",
    "<hr>",
    "Type 'help' to see the list of available commands.",
    "",
  ]);
  addNewInputLine();
}

// Jalankan sekali
initTerminal();
