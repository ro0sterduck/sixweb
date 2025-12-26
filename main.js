function goTo(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
    inline: "center",
  });
}

window.addEventListener("load", () => {
  const middle = document.getElementById("home");
  middle.scrollIntoView({
    behavior: "auto",
    inline: "center",
    block: "nearest",
  });

  const bg = document.querySelector(".bg");
  const container = document.querySelector(".container");

  container.addEventListener("scroll", () => {
    const x = container.scrollLeft;
    bg.style.transform = `translate3d(${-x * 0.005}px, 0, 0) scale(1.05)`;
  });
});

const inputSpan = document.getElementById("input");
const output = document.querySelector(".termout");

let buffer = "";

window.addEventListener("keydown", (kbdpress) => {
  if (kbdpress.ctrlKey || kbdpress.metaKey || kbdpress.altKey) return;

  if (kbdpress.key === "Backspace") {
    buffer = buffer.slice(0, -1);
    updateInput();
    return;
  }

  if (kbdpress.key === "Enter") {
    runCommand(buffer);
    buffer = "";
    updateInput();
    return;
  }

  if (kbdpress.key.length === 1) {
    buffer += kbdpress.key;
    updateInput();
  }
});

function updateInput() {
  inputSpan.textContent = buffer;
}
function runCommand(cmd) {
  if (!cmd.trim()) return;

  const parts = cmd.trim().split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case "help":
      printLine("no help here, best of luck :)");
      break;
    case "hi":
      printLine("heyo!");
      break;
    case "pwd":
      printLine("/home/vi");
      break;
    case "clear":
      output.innerHTML = "";
      break;
    case "sudo":
      if (args.join(" ") === "rm -rf /") {
        window.close();
      } else {
        printLine("nice try");
      }
      break;
    case "vi":
      printLine("yes my name IS a reference to the text editor");
      break;
    case "neofetch":
      printLine("pretend i put cool ascii art here");
      break;
    case "fastfetch":
      printLine("pretend i put cool ascii art here");
      break;
    case "hyfetch":
      printLine("pretend i put cool ascii art here (but trans)");
      break;
    case "screenfetch":
      printLine("pretend i put cool ascii art here");
      break;
    case "fortune":
      printLine("pretend i made a witty joke here");
      break;
    case "cd":
      printLine("nah");
      break;
    case "ls":
      printLine("nah");
      break;
    case "echo":
      printLine(args.join(" "));
      break;
    case "cat":
      printLine("nah");
      break;
    default:
      printLine(`command not found: ${command}`);
  }
}

function printLine(text) {
  const line = document.createElement("h2");
  line.classList.add("output");
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}
