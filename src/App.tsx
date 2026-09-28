import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  Clock3,
  Download,
  Ellipsis,
  Heart,
  History,
  Home,
  Image,
  Info,
  Layers3,
  LockKeyhole,
  PawPrint,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Trash2,
  WandSparkles,
  X,
  type LucideIcon,
} from "lucide-react";

const Pressable = "button";
const TextInput = "input";
const SelectInput = "select";
const TextAreaInput = "textarea";

type Screen =
  | "onboarding"
  | "permissions"
  | "home"
  | "profile"
  | "addPet"
  | "camera"
  | "tips"
  | "quality"
  | "processing"
  | "result"
  | "history"
  | "compare"
  | "search"
  | "notes"
  | "reminders"
  | "share"
  | "settings"
  | "privacy"
  | "empty"
  | "error"
  | "loading"
  | "library"
  | "allScreens";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "quiet" | "danger";
  className?: string;
  disabled?: boolean;
};

function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled,
}: ButtonProps) {
  return (
    <Pressable
      className={`button button-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </Pressable>
  );
}

function IconButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Pressable className="icon-button" onClick={onClick} aria-label={label} type="button">
      <Icon size={20} strokeWidth={1.8} />
    </Pressable>
  );
}

function Header({
  title,
  eyebrow,
  back,
  action,
}: {
  title: string;
  eyebrow?: string;
  back?: () => void;
  action?: ReactNode;
}) {
  return (
    <div className="header">
      <div className="header-side">{back && <IconButton icon={ArrowLeft} label="Go back" onClick={back} />}</div>
      <div className="header-copy">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <div className="header-title">{title}</div>
      </div>
      <div className="header-side header-action">{action}</div>
    </div>
  );
}

function LunaAvatar({ large = false }: { large?: boolean }) {
  return <img className={large ? "avatar avatar-large" : "avatar"} src="/images/luna.jpg" alt="Luna, a Golden Retriever" />;
}

function Row({
  icon: Icon,
  title,
  detail,
  onClick,
  tone,
}: {
  icon: LucideIcon;
  title: string;
  detail?: string;
  onClick?: () => void;
  tone?: "purple" | "red";
}) {
  return (
    <Pressable className="row" onClick={onClick} type="button">
      <span className={`row-icon ${tone ? `row-icon-${tone}` : ""}`}><Icon size={19} /></span>
      <span className="row-copy"><strong>{title}</strong>{detail && <small>{detail}</small>}</span>
      <ChevronRight className="chevron" size={18} />
    </Pressable>
  );
}

function Notice({ children }: { children: ReactNode }) {
  return <div className="notice"><Info size={17} /><span>{children}</span></div>;
}

const scans = [
  { id: 1, title: "Left ear", date: "Today, 9:42 AM", status: "No visible concern", color: "mint" },
  { id: 2, title: "Front paw", date: "May 14, 4:18 PM", status: "Keep an eye on it", color: "amber" },
  { id: 3, title: "Right eye", date: "April 28, 11:06 AM", status: "No visible concern", color: "mint" },
];

function ScanRow({ scan, onClick }: { scan: (typeof scans)[number]; onClick: () => void }) {
  return (
    <Pressable className="scan-row" onClick={onClick} type="button">
      <span className="scan-thumb"><Image size={20} /></span>
      <span className="row-copy"><strong>{scan.title}</strong><small>{scan.date}</small></span>
      <span className={`status-dot status-${scan.color}`} />
      <ChevronRight className="chevron" size={18} />
    </Pressable>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [previous, setPrevious] = useState<Screen>("home");
  const [petName, setPetName] = useState("Luna");
  const [note, setNote] = useState("Luna has been scratching her left ear a little more than usual.");
  const [permission, setPermission] = useState(false);

  const go = (next: Screen) => {
    setPrevious(screen);
    setScreen(next);
  };
  const back = () => setScreen(previous === screen ? "home" : previous);

  const content = useMemo(() => {
    switch (screen) {
      case "onboarding":
        return (
          <div className="onboarding">
            <div className="onboarding-art">
              <span className="spark spark-one"><Sparkles size={22} /></span>
              <LunaAvatar large />
              <span className="spark spark-two"><Heart size={18} /></span>
            </div>
            <div className="brand-lockup"><span className="brand-mark"><PawPrint size={22} /></span>Petal</div>
            <div className="display">A closer look,<br />when they need it.</div>
            <p className="lead">AI-assisted visual wellness checks for the pets you love. Thoughtful guidance in a few gentle steps.</p>
            <Button className="wide" onClick={() => go("permissions")}>Get started <ChevronRight size={18} /></Button>
            <Button variant="quiet" onClick={() => go("home")}>I already have an account</Button>
          </div>
        );
      case "permissions":
        return (
          <>
            <Header title="A few permissions" back={back} />
            <div className="permission-hero"><span><ShieldCheck size={31} /></span><div className="title">You're always in control</div><p>Petal only uses access when you choose to scan or add a photo.</p></div>
            <div className="card inset">
              <Row icon={Camera} title="Camera" detail="Take a photo for a visual check" tone="purple" />
              <Row icon={Image} title="Photo library" detail="Choose an existing photo" />
              <Row icon={Bell} title="Notifications" detail="Optional care reminders" />
            </div>
            <div className="bottom-actions"><Button className="wide" onClick={() => { setPermission(true); go("home"); }}>Allow and continue</Button><Button variant="quiet" onClick={() => go("home")}>Not now</Button></div>
          </>
        );
      case "home":
        return (
          <>
            <div className="topbar"><div className="brand-lockup small"><span className="brand-mark"><PawPrint size={18} /></span>Petal</div><IconButton icon={Bell} label="Reminders" onClick={() => go("reminders")} /></div>
            <div className="greeting"><span>Good morning</span><div className="display display-small">How is Luna today?</div></div>
            <Pressable className="pet-card" onClick={() => go("profile")} type="button">
              <LunaAvatar />
              <span className="pet-copy"><strong>{petName}</strong><small>Golden Retriever · 4 years</small></span>
              <ChevronRight size={19} />
            </Pressable>
            <Pressable className="scan-card" onClick={() => go("camera")} type="button">
              <span className="ai-orb"><WandSparkles size={28} /></span>
              <span className="scan-copy"><span className="eyebrow light">AI VISUAL CHECK</span><strong>Notice something different?</strong><small>Take a clear photo for a careful visual observation.</small></span>
              <span className="round-arrow"><ChevronRight size={20} /></span>
            </Pressable>
            <div className="section-heading"><strong>Recent checks</strong><Pressable onClick={() => go("history")} type="button">See all</Pressable></div>
            <div className="card">{scans.slice(0, 2).map((scan) => <ScanRow key={scan.id} scan={scan} onClick={() => go("result")} />)}</div>
            <div className="care-card"><span className="care-icon"><CalendarDays size={21} /></span><span><strong>Ear care reminder</strong><small>Tomorrow · 8:00 AM</small></span><IconButton icon={Ellipsis} label="Reminder options" /></div>
          </>
        );
      case "profile":
        return (
          <>
            <Header title="Pet profile" back={back} action={<IconButton icon={Ellipsis} label="More options" />} />
            <div className="profile-hero"><LunaAvatar large /><Pressable className="edit-photo" type="button"><Camera size={16} /></Pressable><div className="title">{petName}</div><p>Golden Retriever · Female · 4 years old</p></div>
            <div className="stats"><div><small>Weight</small><strong>64 lb</strong></div><div><small>Birthday</small><strong>Apr 18</strong></div><div><small>Checks</small><strong>12</strong></div></div>
            <div className="section-heading"><strong>About Luna</strong><Pressable type="button">Edit</Pressable></div>
            <div className="card info-grid"><div><small>Breed</small><strong>Golden Retriever</strong></div><div><small>Sex</small><strong>Female</strong></div><div><small>Coat</small><strong>Golden</strong></div><div><small>Microchip</small><strong>Added</strong></div></div>
            <div className="card"><Row icon={History} title="Scan history" detail="12 visual checks" onClick={() => go("history")} /><Row icon={CalendarDays} title="Care notes" detail="3 notes" onClick={() => go("notes")} /></div>
          </>
        );
      case "addPet":
        return (
          <>
            <Header title="Add a pet" back={back} />
            <div className="photo-picker"><span><Camera size={26} /></span><strong>Add a photo</strong><small>It helps personalize their profile</small></div>
            <label className="field"><span>Name</span><TextInput value={petName} onChange={(e) => setPetName(e.target.value)} placeholder="Pet's name" /></label>
            <label className="field"><span>Pet type</span><SelectInput defaultValue="Dog"><option>Dog</option><option>Cat</option><option>Other</option></SelectInput></label>
            <label className="field"><span>Breed</span><TextInput placeholder="Search breeds" /></label>
            <div className="two-fields"><label className="field"><span>Birthday</span><TextInput type="date" /></label><label className="field"><span>Sex</span><SelectInput><option>Female</option><option>Male</option></SelectInput></label></div>
            <div className="bottom-actions"><Button className="wide" onClick={() => go("profile")}>Save pet</Button></div>
          </>
        );
      case "camera":
        return (
          <div className="camera-screen">
            <div className="camera-top"><IconButton icon={X} label="Close camera" onClick={() => go("home")} /><span>Visual check</span><IconButton icon={Info} label="Photo tips" onClick={() => go("tips")} /></div>
            <div className="camera-guide"><span className="corner c1" /><span className="corner c2" /><span className="corner c3" /><span className="corner c4" /><div><strong>Hold steady</strong><small>Keep Luna's left ear inside the frame</small></div></div>
            <div className="camera-controls"><IconButton icon={Image} label="Open library" /><Pressable className="shutter" onClick={() => go("quality")} type="button"><span /></Pressable><IconButton icon={RotateCcw} label="Switch camera" /></div>
          </div>
        );
      case "tips":
        return (
          <>
            <Header title="Photo tips" back={back} />
            <div className="permission-hero">
              <span><Camera size={31} /></span>
              <div className="title">A clear photo helps</div>
              <p>Small adjustments can make Luna's visual check more useful.</p>
            </div>
            <div className="card">
              <Row icon={Sparkles} title="Use soft, even light" detail="Avoid flash and strong shadows" tone="purple" />
              <Row icon={Search} title="Move in close" detail="Keep the area centered and visible" />
              <Row icon={Camera} title="Hold your phone steady" detail="Tap the screen to focus before capturing" />
            </div>
            <Notice>If Luna seems uncomfortable, pause and try again later. Never restrain a pet for a photo.</Notice>
            <div className="bottom-actions"><Button className="wide" onClick={() => go("camera")}>Open camera</Button></div>
          </>
        );
      case "quality":
        return (
          <>
            <Header title="Check the photo" back={back} />
            <div className="quality-photo"><img src="/images/luna.jpg" alt="Luna's ear check" /><span className="focus-ring" /></div>
            <div className="quality-score"><span><Check size={19} /></span><div><strong>Looks clear</strong><small>Good lighting · In focus · Close enough</small></div></div>
            <Notice>Only the area inside the guide will be included in this visual check.</Notice>
            <div className="bottom-actions horizontal"><Button variant="secondary" onClick={() => go("camera")}><RotateCcw size={18} /> Retake</Button><Button onClick={() => go("processing")}><Sparkles size={18} /> Use photo</Button></div>
          </>
        );
      case "processing":
      case "loading":
        return (
          <div className="center-state">
            <div className="processing-orb"><Sparkles size={30} /><span /></div>
            <div className="title">{screen === "loading" ? "Gathering Luna's details" : "Taking a careful look"}</div>
            <p>{screen === "loading" ? "Just a moment…" : "Reviewing visible patterns, color, and texture in the photo."}</p>
            <div className="progress"><span /></div>
            <small>This usually takes less than a minute</small>
            {screen === "processing" && <Button variant="quiet" onClick={() => go("result")}>View result now</Button>}
          </div>
        );
      case "result":
        return (
          <>
            <Header title="Visual check" eyebrow="LEFT EAR · TODAY" back={() => go("home")} action={<IconButton icon={Share2} label="Share" onClick={() => go("share")} />} />
            <div className="result-hero"><div className="result-image"><img src="/images/luna.jpg" alt="Luna" /><span className="focus-ring small-ring" /></div><span className="confidence"><Sparkles size={15} /> AI confidence 87%</span></div>
            <div className="result-summary"><span className="result-icon"><Check size={21} /></span><div><span className="eyebrow">VISIBLE OBSERVATION</span><div className="title">No obvious visible concern</div></div></div>
            <p className="body-copy">The visible skin appears generally even in color, with no clear swelling or discharge in this photo. A small area of mild redness may be present near the inner fold.</p>
            <div className="card inset"><div className="section-heading flush"><strong>What you can do</strong></div><ul className="check-list"><li>Keep the area clean and dry</li><li>Compare again in 24–48 hours</li><li>Note changes in scratching or sensitivity</li></ul></div>
            <Notice>This AI result is a visible observation, not a diagnosis. If Luna seems uncomfortable or symptoms persist, contact a veterinary professional.</Notice>
            <div className="bottom-actions horizontal"><Button variant="secondary" onClick={() => go("notes")}><Plus size={17} /> Add note</Button><Button onClick={() => go("compare")}><Layers3 size={17} /> Compare</Button></div>
          </>
        );
      case "history":
        return (
          <>
            <Header title="History" back={back} action={<IconButton icon={Search} label="Search history" onClick={() => go("search")} />} />
            <div className="filter-pills"><Pressable className="active" type="button">All</Pressable><Pressable type="button">Eyes</Pressable><Pressable type="button">Ears</Pressable><Pressable type="button">Skin & coat</Pressable></div>
            <div className="month-label">MAY 2025</div><div className="card">{scans.map((scan) => <ScanRow scan={scan} key={scan.id} onClick={() => go("result")} />)}</div>
            <div className="month-label">APRIL 2025</div><div className="card"><ScanRow scan={{...scans[2], id: 4, title: "Coat", date: "April 12, 2:36 PM"}} onClick={() => go("result")} /></div>
          </>
        );
      case "compare":
        return (
          <>
            <Header title="Compare checks" back={back} />
            <div className="compare-grid"><div><div className="compare-photo"><img src="/images/luna.jpg" alt="Earlier check" /></div><strong>May 14</strong><small>Earlier</small></div><div><div className="compare-photo zoom"><img src="/images/luna.jpg" alt="Current check" /></div><strong>Today</strong><small>Current</small></div></div>
            <div className="card comparison-copy"><span className="eyebrow">VISIBLE COMPARISON</span><div className="title">Appears mostly unchanged</div><p>No significant visible difference was identified between these photos. Lighting and angle can affect comparison accuracy.</p></div>
            <Notice>Photo comparisons are not a diagnosis. Trust what you notice about Luna's comfort and behavior.</Notice>
            <div className="bottom-actions"><Button className="wide" onClick={() => go("reminders")}><Bell size={18} /> Set a follow-up reminder</Button></div>
          </>
        );
      case "search":
        return (
          <>
            <Header title="Search" back={back} />
            <label className="search-field"><Search size={19} /><TextInput autoFocus placeholder="Search checks and notes" /></label>
            <div className="section-heading"><strong>Recent searches</strong><Pressable type="button">Clear</Pressable></div>
            <div className="card"><Row icon={Clock3} title="Ear redness" onClick={() => go("history")} /><Row icon={Clock3} title="Front paw" onClick={() => go("history")} /></div>
            <div className="section-heading"><strong>Browse by area</strong></div>
            <div className="area-grid">{["Eyes", "Ears", "Paws", "Skin & coat"].map((area) => <Pressable key={area} type="button" onClick={() => go("history")}><span><PawPrint size={19} /></span>{area}</Pressable>)}</div>
          </>
        );
      case "notes":
        return (
          <>
            <Header title="Care note" back={back} action={<Button variant="quiet" onClick={() => go("result")}>Save</Button>} />
            <div className="note-meta"><LunaAvatar /><div><strong>Luna · Left ear</strong><small>Today, 9:42 AM</small></div></div>
            <label className="field"><span>What did you notice?</span><TextAreaInput value={note} onChange={(e) => setNote(e.target.value)} rows={7} /></label>
            <label className="field"><span>Add a tag</span><div className="tag-list"><Pressable type="button" className="active">Scratching</Pressable><Pressable type="button">Redness</Pressable><Pressable type="button">Sensitivity</Pressable></div></label>
            <Pressable className="add-photo" type="button"><Plus size={18} /> Add another photo</Pressable>
            <div className="bottom-actions"><Button className="wide" onClick={() => go("reminders")}><Bell size={18} /> Add follow-up reminder</Button></div>
          </>
        );
      case "reminders":
        return (
          <>
            <Header title="Reminders" back={back} action={<IconButton icon={Plus} label="Add reminder" />} />
            <div className="reminder-date"><span>16</span><div><strong>Check Luna's left ear</strong><small>Tomorrow · 8:00 AM</small></div><Pressable className="toggle on" type="button"><span /></Pressable></div>
            <div className="reminder-date"><span>22</span><div><strong>Monthly weight check</strong><small>May 22 · 6:30 PM</small></div><Pressable className="toggle on" type="button"><span /></Pressable></div>
            <div className="care-quote"><Sparkles size={20} /><p>Little check-ins help you notice Luna's normal. That's valuable care.</p></div>
          </>
        );
      case "share":
        return (
          <>
            <Header title="Share summary" back={back} />
            <div className="share-preview"><div className="share-brand"><PawPrint size={17} /> Petal</div><div className="share-pet"><LunaAvatar /><div><strong>Luna</strong><small>Golden Retriever · 4 years</small></div></div><div className="divider" /><span className="eyebrow">VISUAL CHECK · LEFT EAR</span><div className="title">No obvious visible concern</div><p>Visible skin appears generally even in color. Mild redness may be present near the inner fold.</p><small className="disclaimer">AI-assisted visible observation · Not a diagnosis</small></div>
            <label className="check-option"><TextInput type="checkbox" defaultChecked /><span><strong>Include photo</strong><small>Photo will appear in the shared summary</small></span></label>
            <div className="bottom-actions horizontal"><Button variant="secondary"><Download size={18} /> Save PDF</Button><Button><Share2 size={18} /> Share</Button></div>
          </>
        );
      case "settings":
        return (
          <>
            <Header title="Settings" />
            <div className="settings-profile"><LunaAvatar /><div><strong>Alex & Luna</strong><small>alex@example.com</small></div><ChevronRight size={18} /></div>
            <div className="group-label">PETS</div><div className="card"><Row icon={PawPrint} title="Luna" detail="Golden Retriever" onClick={() => go("profile")} /><Row icon={Plus} title="Add another pet" onClick={() => go("addPet")} /></div>
            <div className="group-label">PREFERENCES</div><div className="card"><Row icon={Bell} title="Notifications" detail={permission ? "On" : "Off"} onClick={() => go("permissions")} /><Row icon={LockKeyhole} title="Privacy & data" onClick={() => go("privacy")} /><Row icon={Layers3} title="Prototype screens" detail="Explore all 23 views" onClick={() => go("allScreens")} /><Row icon={WandSparkles} title="Component library" onClick={() => go("library")} /></div>
            <div className="group-label">ACCOUNT</div><div className="card"><Row icon={Trash2} title="Delete account" tone="red" /></div>
          </>
        );
      case "privacy":
        return (
          <>
            <Header title="Privacy & data" back={back} />
            <div className="privacy-hero"><ShieldCheck size={34} /><div className="title">Your pet's data stays yours</div><p>We use your photos only to provide the visual checks you request.</p></div>
            <div className="card"><Row icon={Image} title="Scan photos" detail="Stored securely" /><Row icon={Download} title="Export your data" detail="Download a copy" /><Row icon={Trash2} title="Delete scan data" tone="red" /></div>
            <div className="privacy-copy"><strong>How AI checks work</strong><p>Photos are processed to identify visible patterns. Results are informational and are never a veterinary diagnosis. We do not sell your personal or pet data.</p></div>
          </>
        );
      case "empty":
        return <EmptyState icon={History} title="A fresh start" copy="Luna's visual checks will appear here, ready to revisit whenever you need." action="Start a visual check" onClick={() => go("camera")} />;
      case "error":
        return <EmptyState icon={RotateCcw} title="We couldn't finish that check" copy="The connection was interrupted. Your photo is still here, so you can safely try again." action="Try again" onClick={() => go("processing")} secondary={() => go("home")} />;
      case "library":
        return (
          <>
            <Header title="Component library" back={back} />
            <div className="group-label">BUTTONS</div><div className="library-stack"><Button>Primary action</Button><Button variant="secondary">Secondary action</Button><Button variant="quiet">Quiet action</Button><Button variant="danger">Delete action</Button></div>
            <div className="group-label">STATUS</div><div className="card inset"><div className="status-samples"><span className="pill mint">No visible concern</span><span className="pill amber">Keep an eye on it</span><span className="pill purple">AI confidence 87%</span></div></div>
            <div className="group-label">FORM & ROWS</div><label className="field"><span>Pet name</span><TextInput defaultValue="Luna" /></label><div className="card"><Row icon={Bell} title="Reminder" detail="Tomorrow · 8:00 AM" /></div>
          </>
        );
      case "allScreens":
        return (
          <>
            <Header title="Prototype screens" back={back} />
            <p className="intro-copy">Every view in the Petal prototype. Tap any screen to open it.</p>
            <div className="screen-grid">{([
              ["onboarding", "Welcome"], ["permissions", "Permissions"], ["home", "Home"], ["profile", "Pet profile"], ["addPet", "Add pet"], ["camera", "AI camera"], ["tips", "Photo tips"], ["quality", "Quality check"], ["processing", "AI processing"], ["result", "Scan result"], ["history", "History"], ["compare", "Comparison"], ["search", "Search"], ["notes", "Notes"], ["reminders", "Reminders"], ["share", "Share"], ["settings", "Settings"], ["privacy", "Privacy"], ["empty", "Empty state"], ["error", "Error state"], ["loading", "Loading state"], ["library", "Components"],
            ] as [Screen, string][]).map(([id, label], index) => <Pressable key={id} onClick={() => go(id)} type="button"><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><ChevronRight size={16} /></Pressable>)}</div>
          </>
        );
    }
  }, [screen, petName, note, permission, previous]);

  const hideNav = ["onboarding", "camera", "permissions", "processing", "loading", "quality", "result", "compare", "notes", "share", "addPet", "error", "empty"].includes(screen);

  return (
    <div className="app-canvas">
      <div className={`phone ${screen === "camera" ? "phone-dark" : ""}`}>
        <div className="statusbar"><span>9:41</span><span className="status-icons">● ◒ ▰</span></div>
        <main className={hideNav ? "content no-nav" : "content"}>{content}</main>
        {!hideNav && (
          <nav className="tabbar">
            <Pressable className={screen === "home" ? "active" : ""} onClick={() => go("home")} type="button"><Home size={21} /><span>Home</span></Pressable>
            <Pressable className={screen === "history" ? "active" : ""} onClick={() => go("history")} type="button"><History size={21} /><span>History</span></Pressable>
            <Pressable className="scan-tab" onClick={() => go("camera")} type="button"><span><Sparkles size={22} /></span><small>Scan</small></Pressable>
            <Pressable className={screen === "profile" ? "active" : ""} onClick={() => go("profile")} type="button"><PawPrint size={21} /><span>Pets</span></Pressable>
            <Pressable className={screen === "settings" ? "active" : ""} onClick={() => go("settings")} type="button"><Settings size={21} /><span>Settings</span></Pressable>
          </nav>
        )}
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  copy,
  action,
  onClick,
  secondary,
}: {
  icon: LucideIcon;
  title: string;
  copy: string;
  action: string;
  onClick: () => void;
  secondary?: () => void;
}) {
  return (
    <div className="center-state">
      <span className="empty-icon"><Icon size={31} /></span>
      <div className="title">{title}</div>
      <p>{copy}</p>
      <Button onClick={onClick}>{action}</Button>
      {secondary && <Button variant="quiet" onClick={secondary}>Back to home</Button>}
    </div>
  );
}
