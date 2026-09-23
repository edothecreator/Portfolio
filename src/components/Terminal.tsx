"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface TerminalLine {
  type: "input" | "output" | "error";
  content: string;
}

const commands: Record<string, string> = {
  whoami: `Edo — 4th year Networks & Systems Engineering @ FSTG Marrakech
Cloud/DevOps obsessed. Building toward AWS SAA + Terraform Associate.
Targeting PFE internship at top tech companies.`,

  "cat interests.txt": `☁️  Cloud Architecture   🐳 Containers   🔧 IaC
⚽  FC Barcelona fan     🎬 K-Dramas     🕵️ Detective Conan`,

  "ls projects/": `vpc-lab/    zero-trust/    cineapi/    cinetrack/    edogawa-vintage/`,

  "cat goals.txt": `→ Pass AWS SAA
→ Land PFE at OCP / CGI / Capgemini / Devoteam
→ Build CloudScale Media Platform
→ Remote work for EU/Gulf companies in 3-4 years`,

  "ping recruiter": `PING recruiter.hiring ... connection established ✓
→ mohamedelkhanfaf0@gmail.com
→ Ready for opportunities. Response time < 24h.`,

  help: `Available commands:
  whoami              — about me
  cat interests.txt   — hobbies & interests
  ls projects/        — list projects
  cat goals.txt       — career goals
  ping recruiter      — reach out
  clear               — clear terminal
  neofetch            — system info`,

  neofetch: `        .--.          edo@cloudstack
       |o_o |         ──────────────────
       |:_/ |         OS: Cloud-Native Linux
      //   \\ \\        Host: AWS eu-west-1
     (|     | )       Kernel: Terraform v1.7
    /'\\_   _/\`\\       Shell: bash 5.2
    \\___)=(___/       Uptime: 4 years
                      Packages: Docker, K8s, Helm
                      DE: VS Code + Terminal
                      Theme: Cyber Terminal Dark`,
};

export default function Terminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", content: 'Welcome to Edo\'s terminal. Type "help" for available commands.' },
    { type: "output", content: "" },
  ]);
  const [input, setInput] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: "input" as const, content: cmd.trim() }];

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (trimmed === "") {
      setHistory([...newHistory, { type: "output", content: "" }]);
      setInput("");
      return;
    }

    const response = commands[trimmed];
    if (response) {
      newHistory.push({ type: "output", content: response });
    } else {
      newHistory.push({
        type: "error",
        content: `bash: ${trimmed}: command not found. Type "help" for available commands.`,
      });
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <section id="about" className="px-4 sm:px-8 lg:px-16 py-24" ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="font-mono text-lg text-muted mb-10">
          <span className="text-secondary">#</span> TERMINAL_ABOUT
        </h2>

        {/* Terminal window */}
        <div
          className="bg-[#0d1117] border border-border rounded-lg overflow-hidden shadow-2xl cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-border">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-muted text-xs font-mono">
              edo@cloudstack:~/about
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            className="p-4 sm:p-6 font-mono text-sm min-h-[300px] max-h-[450px] overflow-y-auto"
          >
            {history.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.type === "input" ? (
                  <div className="flex items-start gap-2">
                    <span className="text-secondary shrink-0">
                      edo@cloudstack:~$
                    </span>
                    <span className="text-text">{line.content}</span>
                  </div>
                ) : line.type === "error" ? (
                  <div className="text-accent whitespace-pre-wrap">
                    {line.content}
                  </div>
                ) : (
                  <div className="text-text/80 whitespace-pre-wrap">
                    {line.content}
                  </div>
                )}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-secondary shrink-0">
                edo@cloudstack:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-text outline-none font-mono text-sm caret-secondary"
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal input"
              />
            </div>
          </div>
        </div>

        {/* Hint */}
        <p className="font-mono text-[11px] text-muted mt-3 text-center">
          Try: <span className="text-primary">whoami</span> ·{" "}
          <span className="text-primary">cat interests.txt</span> ·{" "}
          <span className="text-primary">ls projects/</span> ·{" "}
          <span className="text-primary">neofetch</span> ·{" "}
          <span className="text-primary">help</span>
        </p>
      </motion.div>
    </section>
  );
}
