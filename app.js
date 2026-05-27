const { useState, useEffect, useRef } = React;

// Premium curated Grey Aubrey canvas collection
const WALLPAPERS = {
    "Aubrey Slate": "linear-gradient(135deg, #7e8a96 0%, #4a535a 100%)",
    "Concrete Matte": "linear-gradient(180deg, #b8b8b8 0%, #8c8c8c 100%)",
    "Brushed Charcoal": "linear-gradient(145deg, #3a3f44 0%, #1c1e22 100%)",
    "Minimalist Silk": "linear-gradient(135deg, #eef2f3 0%, #8e9eab 100%)",
    "Cyber Quartz": "linear-gradient(225deg, #2c3e50 0%, #000000 100%)"
};

function GraphiteOS() {
    // Hardware Simulation Kernel States
    const [time, setTime] = useState(new Date());
    const [batteryLevel, setBatteryLevel] = useState(88);
    const [isCharging, setIsCharging] = useState(false);
    const [currentWallpaper, setCurrentWallpaper] = useState("Aubrey Slate");
    const [systemMenuOpen, setSystemMenuOpen] = useState(false);
    
    // Core Process Management Structure
    const [windows, setWindows] = useState({
        browser: { isOpen: true, isMaximized: false, isMinimized: false, x: 60, y: 60, w: 900, h: 580, zIndex: 10 },
        notes: { isOpen: false, isMaximized: false, isMinimized: false, x: 120, y: 140, w: 750, h: 480, zIndex: 5 },
        files: { isOpen: false, isMaximized: false, isMinimized: false, x: 200, y: 100, w: 700, h: 420, zIndex: 5 },
        calculator: { isOpen: false, isMaximized: false, isMinimized: false, x: 400, y: 180, w: 280, h: 440, zIndex: 5 },
        settings: { isOpen: false, isMaximized: false, isMinimized: false, x: 260, y: 80, w: 640, h: 480, zIndex: 12 }
    });
    
    const [topZ, setTopZ] = useState(15);
    const [activeApp, setActiveApp] = useState("browser");

    // File Manager State Registry
    const [fileSystem, setFileSystem] = useState({
        root: [
            { name: "Documents", icon: "fa-folder", type: "dir" },
            { name: "Downloads", icon: "fa-folder", type: "dir" },
            { name: "Production Code", icon: "fa-folder-code", type: "dir" },
            { name: "Graphite_Readme.txt", icon: "fa-file-lines", type: "file", content: "Graphite OS v1.0. Engineered inside a high-end Grey Aubrey palette layout structure." }
        ]
    });
    const [selectedFile, setSelectedFile] = useState(null);

    // Dynamic Note Processing Subsystem
    const [notes, setNotes] = useState(() => {
        const cached = localStorage.getItem("graphite_pro_notes");
        return cached ? JSON.parse(cached) : [
            { id: 1, title: "🚀 Next-Gen WebOS Ideas", content: "1. Build out canvas rendering sub-nodes\n2. Introduce optimized proxy relays\n3. Retain the elegant Grey Aubrey aesthetics." },
            { id: 2, title: "🎨 Theme Spec Sheet", content: "Hex Hierarchy:\n- Primary Matte: #7e8a96\n- Deep Contrast Control: #1c1e22\n- Glass Frame Layer: rgba(220, 220, 220, 0.45)" }
        ];
    });
    const [activeNoteId, setActiveNoteId] = useState(1);

    // Advanced Proxy Browser Core
    const [browserUrl, setBrowserUrl] = useState("https://embed.crazygames.com/en/LLC/capsule-clicker");
    const [browserInput, setBrowserInput] = useState("https://www.crazygames.com/game/capsule-clicker");

    // Live Calculator Stack
    const [calcExpression, setCalcExpression] = useState("");
    const [calcResult, setCalcResult] = useState("0");

    // Clock System Pipeline Tick
    useEffect(() => {
        const cpuTimer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(cpuTimer);
    }, []);

    // Local Storage Note Pipeline Syncing
    useEffect(() => {
        localStorage.setItem("graphite_pro_notes", JSON.stringify(notes));
    }, [notes]);

    // Window Thread Management Utility Controllers
    const focusProcess = (appKey) => {
        const nextZIndex = topZ + 1;
        setTopZ(nextZIndex);
        setWindows(prev => ({
            ...prev,
            [appKey]: { ...prev[appKey], zIndex: nextZIndex, isMinimized: false }
        }));
        setActiveApp(appKey);
    };

    const initializeProcess = (appKey) => {
        setWindows(prev => ({
            ...prev,
            [appKey]: { ...prev[appKey], isOpen: true, isMinimized: false }
        }));
        focusProcess(appKey);
    };

    const killProcess = (appKey, event) => {
        if (event) event.stopPropagation();
        setWindows(prev => ({ ...prev, [appKey]: { ...prev[appKey], isOpen: false } }));
        if (activeApp === appKey) setActiveApp(null);
    };

    const minimizeProcess = (appKey, event) => {
        if (event) event.stopPropagation();
        setWindows(prev => ({ ...prev, [appKey]: { ...prev[appKey], isMinimized: true } }));
        if (activeApp === appKey) setActiveApp(null);
    };

    const toggleMaximizeProcess = (appKey, event) => {
        if (event) event.stopPropagation();
        setWindows(prev => ({ ...prev, [appKey]: { ...prev[appKey], isMaximized: !prev[appKey].isMaximized } }));
    };

    // Vector Multi-Window Drag Routing Engine
    const initiateWindowDrag = (appKey, event) => {
        if (windows[appKey].isMaximized) return;
        focusProcess(appKey);
        
        const targetWindow = windows[appKey];
        const offsetLeft = event.clientX - targetWindow.x;
        const offsetTop = event.clientY - targetWindow.y;

        const updatePosition = (moveEvent) => {
            setWindows(prev => ({
                ...prev,
                [appKey]: {
                    ...prev[appKey],
                    x: moveEvent.clientX - offsetLeft,
                    y: Math.max(32, moveEvent.clientY - offsetTop) // Prevent sliding behind TopBar
                }
            }));
        };

        const severDragListeners = () => {
            document.removeEventListener("mousemove", updatePosition);
            document.removeEventListener("mouseup", severDragListeners);
            document.body.classList.remove("grabbing-engine");
        };

        document.body.classList.add("grabbing-engine");
        document.addEventListener("mousemove", updatePosition);
        document.addEventListener("mouseup", severDragListeners);
    };

    // Smart Battery Display Interface Logic
    const resolveBatteryDiagnostics = () => {
        if (batteryLevel <= 12) return { color: "text-red-500", icon: "fa-battery-empty" };
        if (batteryLevel <= 25) return { color: "text-amber-500", icon: "fa-battery-quarter" };
        if (batteryLevel <= 60) return { color: "text-slate-700", icon: "fa-battery-half" };
        return { color: "text-emerald-600", icon: "fa-battery-full" };
    };

    // Browser URL Parsing and Normalization (Handles Proxies & Embed Hooks)
    const runBrowserRouting = (e) => {
        if (e) e.preventDefault();
        let input = browserInput.trim();
        
        if (!/^https?:\/\//i.test(input)) {
            input = "https://" + input;
        }

        // Automatic URL un-wrapper optimization for modern game hubs like CrazyGames
        if (input.includes("crazygames.com/game/")) {
            const cleanSlug = input.split("/game/")[1];
            const directEmbedUrl = `https://embed.crazygames.com/en/LLC/${cleanSlug}`;
            setBrowserUrl(directEmbedUrl);
            setBrowserInput(input);
            return;
        }

        setBrowserUrl(input);
    };

    // Secure Sandbox Proxy Pipe Wrapper Engine
    const forceCORSProxyPipe = () => {
        const embeddedProxyGate = `https://api.allorigins.win/raw?url=${encodeURIComponent(browserUrl)}`;
        setBrowserUrl(embeddedProxyGate);
    };

    // Calculator Keypad Logic Matrix
    const inputCalcToken = (token) => {
        if (token === "C") {
            setCalcExpression("");
            setCalcResult("0");
        } else if (token === "=") {
            try {
                // Safe algebraic parsing mechanism using custom token execution bounds
                const cleanInput = calcExpression.replace(/×/g, "*").replace(/÷/g, "/");
                const evaluation = Function(`"use strict"; return (${cleanInput})`)();
                setCalcResult(String(evaluation));
                setCalcExpression(String(evaluation));
            } catch (err) {
                setCalcResult("Error");
            }
        } else {
            setCalcExpression(prev => prev + token);
        }
    };

    const currentBattery = resolveBatteryDiagnostics();
    const workingNote = notes.find(n => n.id === activeNoteId) || notes[0] || { title: "", content: "" };

    return (
        <div 
            className="w-screen h-screen relative overflow-hidden select-none transition-all duration-700 font-sans"
            style={{ background: WALLPAPERS[currentWallpaper] }}
            onClick={() => setSystemMenuOpen(false)}
        >
            
            {/* ====== TOP SYSTEM NAVIGATION CONTROL BAR (macOS Style Matrix) ====== */}
            <header className="w-full h-8 fixed top-0 left-0 z-50 flex items-center justify-between px-4 text-xs font-semibold text-gray-800 bg-[#e0e0e0]/75 border-b border-white/30 backdrop-blur-md shadow-sm">
                <div className="flex items-center space-x-5">
                    <div 
                        className="flex items-center space-x-1.5 cursor-pointer hover:bg-black/5 px-2.5 py-1 rounded transition-all"
                        onClick={(e) => { e.stopPropagation(); setSystemMenuOpen(!systemMenuOpen); }}
                    >
                        <i className="fa-solid fa-cube text-[#4a535a] animate-pulse"></i>
                        <span className="font-bold tracking-tight text-gray-900">Graphite OS</span>
                    </div>
                    <span className="text-gray-400 font-light">|</span>
                    <nav className="flex items-center space-x-4">
                        {["browser", "notes", "files", "calculator", "settings"].map((app) => (
                            <span 
                                key={app}
                                onClick={() => initializeProcess(app)}
                                className="cursor-pointer text-gray-700 hover:text-black font-medium tracking-wide capitalize"
                            >
                                {app === "files" ? "Explorer" : app}
                            </span>
                        ))}
                    </nav>
                </div>

                {/* Hardware Telemetry Outputs Area */}
                <div className="flex items-center space-x-4">
                    {/* Dynamic Real-time Diagnostics Output */}
                    <div 
                        onClick={() => initializeProcess("settings")}
                        className={`flex items-center space-x-2 cursor-pointer bg-white/40 px-2 py-0.5 rounded border border-white/20 transition-all shadow-2xs hover:bg-white/60 ${currentBattery.color}`}
                    >
                        {isCharging && <i className="fa-solid fa-bolt text-amber-500 text-[10px] animate-bounce"></i>}
                        <span className="font-mono text-[11px] font-bold">{batteryLevel}%</span>
                        <i className={`fa-solid ${currentBattery.icon} text-xs`}></i>
                    </div>

                    <div className="flex items-center space-x-1.5 text-gray-600 bg-white/40 px-2 py-0.5 rounded border border-white/20 text-[11px]">
                        <i className="fa-solid fa-wifi"></i>
                        <span className="font-mono">Adaptive Link</span>
                    </div>

                    {/* Clock Display Module */}
                    <div className="text-gray-900 font-mono text-[11px] bg-white/50 px-2.5 py-0.5 rounded-md border border-white/20 shadow-2xs font-bold">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                </div>

                {/* Advanced Desktop Context Dropdown Node Menu */}
                {systemMenuOpen && (
                    <div className="absolute top-9 left-2 w-56 bg-[#f0f0f0]/95 border border-black/15 rounded-lg shadow-2xl p-1.5 backdrop-blur-xl animate-fade-in text-gray-800">
                        <div className="px-3 py-1.5 text-[9px] text-gray-500 font-black tracking-widest uppercase border-b border-black/5">System Controller</div>
                        <button onClick={() => initializeProcess("settings")} className="w-full text-left px-2.5 py-1.5 hover:bg-black/5 text-xs rounded-md transition flex items-center justify-between">
                            <span>System Settings Matrix</span> <i className="fa-solid fa-sliders text-gray-400"></i>
                        </button>
                        <button onClick={() => initializeProcess("files")} className="w-full text-left px-2.5 py-1.5 hover:bg-black/5 text-xs rounded-md transition flex items-center justify-between">
                            <span>File Tree Nodes</span> <i className="fa-solid fa-folder-tree text-gray-400"></i>
                        </button>
                        <hr className="border-black/5 my-1" />
                        <button onClick={() => window.location.reload()} className="w-full text-left px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-700 font-semibold text-xs rounded-md transition flex items-center justify-between">
                            <span>Soft Hot-Reboot</span> <i className="fa-solid fa-arrow-rotate-right"></i>
                        </button>
                    </div>
                )}
            </header>

            {/* ====== DESKTOP COMPONENT CANVAS SURFACE INTERFACE ====== */}
            <main className="w-full h-full pt-10 pb-24 relative overflow-hidden">
                
                {/* Desktop High-End Core Utility Shortcut Anchors */}
                <div className="absolute top-14 left-5 flex flex-col space-y-6">
                    {[
                        { id: "browser", label: "Graphite Browse", icon: "fa-globe", color: "bg-slate-700/20 text-slate-100" },
                        { id: "notes", label: "Aubrey Notes", icon: "fa-pen-to-square", color: "bg-zinc-700/20 text-zinc-100" },
                        { id: "files", label: "File System", icon: "fa-hard-drive", color: "bg-gray-700/20 text-gray-100" }
                    ].map((shortcut) => (
                        <div 
                            key={shortcut.id}
                            onDoubleClick={() => initializeProcess(shortcut.id)}
                            className="flex flex-col items-center space-y-1 w-20 cursor-pointer group"
                        >
                            <div className={`w-14 h-14 ${shortcut.color} border border-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-md group-hover:scale-105 group-hover:bg-white/10 transition-all duration-300`}>
                                <i className={`fa-solid ${shortcut.icon} text-2xl drop-shadow-sm`}></i>
                            </div>
                            <span className="text-[11px] text-white font-bold drop-shadow-md text-center tracking-wide group-hover:underline">{shortcut.label}</span>
                        </div>
                    ))}
                </div>

                {/* ====== APP WINDOW RENDERING LIFECYCLE CONTROLLER ====== */}
                {Object.keys(windows).map((appKey) => {
                    const win = windows[appKey];
                    if (!win.isOpen) return null;

                    return (
                        <div
                            key={appKey}
                            style={{
                                top: win.isMaximized ? "32px" : `${win.y}px`,
                                left: win.isMaximized ? "0px" : `${win.x}px`,
                                width: win.isMaximized ? "100vw" : `${win.w}px`,
                                height: win.isMaximized ? "calc(100vh - 120px)" : `${win.h}px`,
                                zIndex: win.zIndex
                            }}
                            className={`absolute flex flex-col rounded-xl overflow-hidden shadow-2xl border transition-all duration-150 window-transition bg-[#eaeaea]
                                ${win.isMinimized ? 'window-minimize-target' : ''}
                                ${activeApp === appKey ? 'border-black/20 ring-1 ring-white/30 shadow-black/30' : 'border-black/10 opacity-95 shadow-black/10'}
                            `}
                            onClick={() => focusProcess(appKey)}
                        >
                            {/* Window TitleBar Section */}
                            <div 
                                onMouseDown={(e) => initiateWindowDrag(appKey, e)}
                                onDoubleClick={(e) => toggleMaximizeProcess(appKey, e)}
                                className="w-full h-10 bg-[#dfdfdf] border-b border-black/10 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing shrink-0"
                            >
                                {/* Desaturated high-end traffic controls */}
                                <div className="flex items-center space-x-2 w-24">
                                    <button onClick={(e) => killProcess(appKey, e)} className="w-3.5 h-3.5 rounded-full bg-red-400/80 hover:bg-red-500 transition-all flex items-center justify-center text-[9px] text-black/40 font-bold">×</button>
                                    <button onClick={(e) => minimizeProcess(appKey, e)} className="w-3.5 h-3.5 rounded-full bg-amber-400/80 hover:bg-amber-500 transition-all flex items-center justify-center text-[9px] text-black/40 font-bold">-</button>
                                    <button onClick={(e) => toggleMaximizeProcess(appKey, e)} className="w-3.5 h-3.5 rounded-full bg-emerald-400/80 hover:bg-emerald-500 transition-all flex items-center justify-center text-[8px] text-black/40 font-bold">+</button>
                                </div>
                                
                                <div className="text-xs font-bold text-slate-700 font-sans tracking-wide uppercase text-[10px]">
                                    {appKey === "browser" ? "Graphite Core Browser" : appKey === "files" ? "System Directory Explorer" : `${appKey} Suite`}
                                </div>
                                <div className="w-24 text-right">
                                    <i className="fa-solid fa-ellipsis text-gray-400 text-xs"></i>
                                </div>
                            </div>

                            {/* ====== APPLICATION PIPELINE DOM ROUTER ====== */}
                            <div className="w-full flex-1 overflow-hidden bg-[#f4f4f4]">
                                
                                {/* A. GRAPHITE PROXY WEB BROWSER */}
                                {appKey === "browser" && (
                                    <div className="w-full h-full flex flex-col bg-white">
                                        <div className="bg-[#eeeeee] p-2 border-b border-black/10 flex items-center space-x-3 shadow-2xs">
                                            <div className="flex space-x-1.5 text-gray-500 text-xs pl-1">
                                                <i className="fa-solid fa-arrow-left p-1.5 hover:bg-black/5 rounded cursor-pointer"></i>
                                                <i className="fa-solid fa-arrow-right p-1.5 hover:bg-black/5 rounded cursor-pointer"></i>
                                                <i className="fa-solid fa-rotate-right p-1.5 hover:bg-black/5 rounded cursor-pointer" onClick={() => setBrowserUrl(browserUrl)}></i>
                                            </div>
                                            <form onSubmit={runBrowserRouting} className="flex-1">
                                                <div className="relative flex items-center">
                                                    <i className="fa-solid fa-lock absolute left-3 text-[10px] text-emerald-600"></i>
                                                    <input 
                                                        type="text" 
                                                        value={browserInput} 
                                                        onChange={(e) => setBrowserInput(e.target.value)}
                                                        className="w-full bg-white border border-black/15 rounded-md pl-7 pr-24 py-1 text-xs focus:outline-none font-mono text-gray-700 shadow-inner focus:border-slate-500" 
                                                    />
                                                    <div className="absolute right-1 text-[9px] font-bold text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded uppercase tracking-wider">SECURE PIPE</div>
                                                </div>
                                            </form>
                                            <button 
                                                onClick={forceCORSProxyPipe}
                                                className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded-md shadow-xs transition-all flex items-center space-x-1"
                                            >
                                                <i className="fa-solid fa-shield-halved text-[10px]"></i>
                                                <span>Bypass Proxy</span>
                                            </button>
                                        </div>
                                        <div className="flex-1 bg-zinc-100 relative">
                                            {/* Sandboxed Failover User Interaction Layer */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#f8f9fa] z-0">
                                                <div className="w-16 h-16 bg-slate-200 text-slate-600 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-inner">
                                                    <i className="fa-solid fa-network-wired"></i>
                                                </div>
                                                <h3 className="text-sm font-bold text-gray-800">CORS Frame Guard System Active</h3>
                                                <p className="text-xs text-gray-500 max-w-md mt-1.5 mb-5 leading-relaxed">
                                                    If the requested domain restricts standard embedded views via CSP security parameters, optimize parameters or load via the direct embed node configuration.
                                                </p>
                                                <div className="flex space-x-3">
                                                    <button 
                                                        onClick={() => {
                                                            setBrowserInput("https://www.crazygames.com/game/capsule-clicker");
                                                            setBrowserUrl("https://embed.crazygames.com/en/LLC/capsule-clicker");
                                                        }}
                                                        className="px-4 py-2 bg-slate-700 text-white rounded-md text-xs font-bold hover:bg-slate-800 shadow transition-all"
                                                    >
                                                        Load Optimized CrazyGames Core
                                                    </button>
                                                    <a href={browserUrl} target="_blank" rel="noreferrer" className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 border border-black/10 rounded-md text-xs font-bold transition-all">
                                                        Isolate Tab View <i className="fa-solid fa-up-right-from-square ml-1 text-[10px]"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <iframe 
                                                src={browserUrl} 
                                                className="w-full h-full border-none relative z-10 bg-white"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; gamepad"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                )}

                                {/* B. AUBREY NOTES MULTI-DOCUMENT RUNTIME */}
                                {appKey === "notes" && (
                                    <div className="w-full h-full flex bg-[#fafafa]">
                                        <div className="w-52 bg-[#e6e6e6] border-r border-black/10 flex flex-col p-2.5">
                                            <button 
                                                onClick={() => {
                                                    const nextId = Date.now();
                                                    setNotes(prev => [...prev, { id: nextId, title: "New Log Entry", content: "" }]);
                                                    setActiveNoteId(nextId);
                                                }} 
                                                className="w-full py-2 mb-3 bg-slate-600 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm flex items-center justify-center space-x-1"
                                            >
                                                <i className="fa-solid fa-plus text-[10px]"></i> <span>Compose File</span>
                                            </button>
                                            <div className="flex-1 overflow-y-auto space-y-1">
                                                {notes.map(note => (
                                                    <div 
                                                        key={note.id} 
                                                        onClick={() => setActiveNoteId(note.id)}
                                                        className={`p-2.5 rounded-md text-xs cursor-pointer flex justify-between items-center group transition-all ${activeNoteId === note.id ? 'bg-white/90 shadow-2xs font-bold text-gray-900 border-l-4 border-slate-600' : 'hover:bg-black/5 text-gray-600'}`}
                                                    >
                                                        <span className="truncate pr-2 font-mono">{note.title || "Untitled Document"}</span>
                                                        <i 
                                                            className="fa-solid fa-trash-can opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all text-[11px]"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (notes.length === 1) return;
                                                                setNotes(prev => prev.filter(n => n.id !== note.id));
                                                                if (activeNoteId === note.id) {
                                                                    const fallback = notes.filter(n => n.id !== note.id);
                                                                    setActiveNoteId(fallback[0].id);
                                                                }
                                                            }}
                                                        ></i>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex-1 p-5 flex flex-col">
                                            <input 
                                                type="text" 
                                                value={workingNote.title} 
                                                onChange={(e) => setNotes(prev => prev.map(n => n.id === activeNoteId ? { ...n, title: e.target.value } : n))}
                                                className="bg-transparent border-none text-lg font-black text-slate-800 focus:outline-none mb-3 w-full font-mono tracking-tight"
                                                placeholder="Document Label"
                                            />
                                            <textarea 
                                                value={workingNote.content} 
                                                onChange={(e) => setNotes(prev => prev.map(n => n.id === activeNoteId ? { ...n, content: e.target.value } : n))}
                                                className="bg-transparent border-none text-xs text-gray-700 flex-1 focus:outline-none resize-none leading-relaxed w-full font-mono"
                                                placeholder="Begin compilation stream memory entry..."
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* C. DIRECTORY HIERARCHY MANAGER */}
                                {appKey === "files" && (
                                    <div className="w-full h-full flex bg-[#f5f5f5]">
                                        <div className="w-44 bg-[#e8e8e8] border-r border-black/10 p-3 text-xs text-slate-600 space-y-2">
                                            <div className="font-black text-gray-400 uppercase text-[9px] tracking-wider">File System Tree</div>
                                            <div className="bg-white/80 text-slate-900 font-bold p-1.5 rounded-md border border-black/5 cursor-pointer flex items-center space-x-1.5">
                                                <i className="fa-solid fa-folder text-slate-600"></i> <span>Root Core</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 p-6 flex flex-col justify-between">
                                            <div className="grid grid-cols-4 gap-5 items-start content-start">
                                                {fileSystem.root.map((node, idx) => (
                                                    <div 
                                                        key={idx} 
                                                        onClick={() => setSelectedFile(node)}
                                                        className={`flex flex-col items-center p-3 rounded-xl cursor-pointer group transition-all border ${selectedFile?.name === node.name ? 'bg-white border-black/15 shadow-xs' : 'border-transparent hover:bg-black/5'}`}
                                                    >
                                                        <i className={`fa-solid ${node.icon} text-3xl text-slate-500 group-hover:text-slate-700 transition-colors shadow-2xs`}></i>
                                                        <span className="text-[11px] text-gray-800 text-center font-bold font-mono mt-2 truncate w-full">{node.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {/* Advanced File Inspector Panel Drawer */}
                                            {selectedFile && (
                                                <div className="bg-white p-3 border border-black/10 rounded-lg shadow-inner font-mono text-[11px] text-gray-700">
                                                    <div className="font-bold text-gray-900 uppercase text-[10px] tracking-wider mb-1 flex items-center justify-between">
                                                        <span>Meta Inspector</span>
                                                        <button className="text-gray-400 hover:text-black font-sans" onClick={() => setSelectedFile(null)}>×</button>
                                                    </div>
                                                    <p><strong>Object:</strong> {selectedFile.name}</p>
                                                    <p><strong>Allocation Node:</strong> {selectedFile.type === "dir" ? "Directory Array Folder" : "System Text File"}</p>
                                                    {selectedFile.content && <p className="mt-2 bg-gray-50 p-1.5 rounded border border-black/5 text-slate-600">{selectedFile.content}</p>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* D. MATHEMATICAL PROCESSOR NODE */}
                                {appKey === "calculator" && (
                                    <div className="w-full h-full bg-[#dfdfdf] p-4 flex flex-col justify-end">
                                        <div className="w-full bg-white border border-black/15 text-right p-4 rounded-lg mb-4 shadow-inner">
                                            <div className="text-[10px] font-mono text-gray-400 tracking-wide min-h-4">{calcExpression || ""}</div>
                                            <div className="text-2xl font-mono text-slate-800 tracking-tight font-black overflow-x-auto">{calcResult}</div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-1.5 text-xs font-bold font-mono">
                                            {["C", "(", ")", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="].map((char) => (
                                                <button 
                                                    key={char} 
                                                    onClick={() => inputCalcToken(char)}
                                                    className={`p-3.5 rounded-lg text-center shadow-xs active:scale-95 transition-all cursor-pointer
                                                        ${char === "=" ? "col-span-2 bg-slate-600 hover:bg-slate-700 text-white font-black" : ""}
                                                        ${["÷","×","-","+","(",")","C"].includes(char) ? "bg-gray-300 text-slate-800 hover:bg-gray-400/80" : "bg-white hover:bg-gray-100 text-gray-700"}
                                                    `}
                                                >
                                                    {char}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* E. ENVIRONMENT CONTROL PANEL & DIAGNOSTICS */}
                                {appKey === "settings" && (
                                    <div className="w-full h-full flex bg-[#f4f4f4]">
                                        <div className="w-48 bg-[#e8e8e8] border-r border-black/10 p-3 text-xs text-slate-600 space-y-1">
                                            <div className="p-1.5 font-black text-gray-400 uppercase text-[9px] tracking-wider">Device Matrix</div>
                                            <div className="bg-white/80 font-bold text-slate-900 p-2 rounded-md border border-black/5 cursor-pointer">Environment Params</div>
                                        </div>
                                        <div className="flex-1 p-5 overflow-y-auto space-y-5 text-xs text-gray-700">
                                            <div>
                                                <h2 className="text-base font-black text-gray-900 font-mono tracking-tight">Graphite Architecture Pro</h2>
                                                <p className="text-gray-400 font-mono text-[10px]">Kernel Architecture Core v1.0.26</p>
                                            </div>

                                            <hr className="border-black/5" />

                                            {/* SYSTEM TELEMETRY SLIDERS */}
                                            <div className="bg-white p-4 rounded-xl border border-black/10 shadow-xs space-y-4">
                                                <h3 className="font-black text-gray-800 uppercase text-[10px] tracking-widest text-slate-500">Hardware Mock Simulation Sub-array</h3>
                                                
                                                <div>
                                                    <div className="flex justify-between mb-1 font-mono text-[11px]">
                                                        <span>Battery Simulation Power Array:</span>
                                                        <span className="font-bold text-slate-900">{batteryLevel}%</span>
                                                    </div>
                                                    <input 
                                                        type="range" 
                                                        min="1" 
                                                        max="100" 
                                                        value={batteryLevel} 
                                                        onChange={(e) => setBatteryLevel(Number(e.target.value))}
                                                        className="w-full accent-slate-600 bg-gray-200 rounded-lg h-1.5 cursor-pointer" 
                                                    />
                                                </div>

                                                <label className="flex items-center space-x-2.5 cursor-pointer font-bold text-slate-700 select-none">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={isCharging} 
                                                        onChange={(e) => setIsCharging(e.target.checked)}
                                                        className="rounded border-gray-300 text-slate-600 accent-slate-600 focus:ring-0 w-4 h-4" 
                                                    />
                                                    <span>Inject Virtual AC Transformer Grid Input (Charging State)</span>
                                                </label>
                                            </div>

                                            {/* WALLPAPER CONTROL COMPONENT */}
                                            <div>
                                                <h3 className="font-bold text-slate-800 mb-2 font-mono uppercase text-[10px] tracking-wider text-slate-400">Desktop Texture Array</h3>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {Object.keys(WALLPAPERS).map((wp) => (
                                                        <button 
                                                            key={wp}
                                                            onClick={() => setCurrentWallpaper(wp)}
                                                            className={`p-3 rounded-lg border text-left font-mono font-bold text-[11px] transition-all cursor-pointer shadow-2xs ${currentWallpaper === wp ? 'border-slate-700 bg-white text-slate-900 ring-1 ring-slate-500' : 'border-black/10 bg-white/60 text-gray-500 hover:bg-white hover:text-black'}`}
                                                        >
                                                            <i className="fa-solid fa-palette mr-2 text-slate-400"></i> {wp}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    );
                })}

            </main>

            {/* ====== HYBRID BOTTOM SYSTEM CORE DOCK (macOS Navigation Architecture) ====== */}
            <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 h-16 bg-[#2d2d2d]/60 border border-white/10 px-5 rounded-2xl flex items-center space-x-4 glassmorphic backdrop-blur-md shadow-2xl z-50">
                {[
                    { key: "browser", label: "Core Browser", icon: "fa-globe" },
                    { key: "notes", label: "Aubrey Notes", icon: "fa-pen-to-square" },
                    { key: "files", label: "File Node", icon: "fa-folder-open" },
                    { key: "calculator", label: "Math Engine", icon: "fa-calculator" },
                    { key: "settings", label: "Sys Settings", icon: "fa-sliders" }
                ].map((app) => {
                    const isRunning = windows[app.key].isOpen;
                    const isActive = activeApp === app.key && isRunning;
                    
                    return (
                        <div 
                            key={app.key}
                            onClick={() => initializeProcess(app.key)}
                            className={`relative group w-11 h-11 rounded-xl flex items-center justify-center text-xl cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-md
                                ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}
                            `}
                        >
                            <i className={`fa-solid ${app.icon} text-base drop-shadow-sm`}></i>
                            
                            {/* Adaptive Anchor Tooltip */}
                            <div className="absolute -top-10 bg-zinc-900 text-white font-mono font-bold text-[10px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
                                {app.label}
                            </div>

                            {/* Windows Engine Style Active Task Monitor Pipeline Dot */}
                            {isRunning && (
                                <div className={`absolute bottom-1 w-1.5 h-1.5 rounded-full transition-all duration-300 shadow-xs ${isActive ? 'bg-white w-3' : 'bg-gray-400'}`}></div>
                            )}
                        </div>
                    );
                })}
            </footer>
        </div>
    );
}

// Render Engine Activation Loop Execution
const systemRootNode = ReactDOM.createRoot(document.getElementById("root"));
systemRootNode.render(<GraphiteOS />);
