function goTo(id) {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
    inline: "center",
  });
  parallax(id);
}

window.addEventListener("load", () => {
  const middle = document.getElementById("home");
  middle.scrollIntoView({
    behavior: "auto",
    inline: "center",
    block: "nearest",
  });
  parallaxStart();
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

window.addEventListener("load", () => {
  const blog = document.getElementById("blog");
  const dvd = document.getElementById("dvd");

  let x = 20;
  let y = 20;
  let dx = 1.5;
  let dy = 1.5;

  function bounds() {
    return {
      maxX: blog.clientWidth - dvd.offsetWidth,
      maxY: blog.clientHeight - dvd.offsetHeight,
    };
  }

  let b = bounds();

  window.addEventListener("resize", () => {
    b = bounds();
  });

  function animate() {
    x += dx;
    y += dy;

    if (x <= 0 || x >= b.maxX) dx *= -1;
    if (y <= 0 || y >= b.maxY) dy *= -1;

    x = Math.max(0, Math.min(x, b.maxX));
    y = Math.max(0, Math.min(y, b.maxY));

    dvd.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animate);
  }

  animate();
});
function scaleApp() {
  const app = document.getElementById("global");
  const scale = Math.min(window.innerWidth / 2560, window.innerHeight / 1300);

  app.style.transform = `scale(${scale})`;
}

window.addEventListener("resize", scaleApp);
window.addEventListener("load", scaleApp);

const bg = document.querySelector(".bg");

function parallax(id) {
  let offsetX = 0;
  let offsetY = 0;
  switch (id) {
    case "home":
      offsetX = 30;
      offsetY = 0;
      break;
    case "contact":
      offsetX = 0;
      offsetY = 0;
      break;
    case "projects":
      offsetX = -30;
      offsetY = 0;
      break;
    case "blog":
      offsetX = -60;
      offsetY = 0;
      break;
  }

  bg.style.transition = "transform 0.5s ease";
  bg.style.transform = `scale(1.05) translate(${offsetX}px, ${offsetY}px)`;
}
function parallaxStart(id) {
  let offsetX = 30;
  let offsetY = 0;
  bg.style.transition = "transform";
  bg.style.transform = `scale(1.05) translate(${offsetX}px, ${offsetY}px)`;
}
