import { MoreVertical, ChevronLast, ChevronFirst, Menu } from "lucide-react";
import { useContext, createContext, useState } from "react";

const SidebarContext = createContext();

const Sidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-screen border-gray-500 shadow-xl ">
      <nav className="h-full inline-flex flex-col shadow-xl bg-gray-900">
        <div className="p-4 pb-2.5 bg-gray-900 shadow-xl flex justify-between items-center">
          {/* <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          /> */}
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-500 hover:bg-gray-100"
            style={{ backgroundColor: "#111d2b" }}
          >
            {expanded ? (
              <Menu style={{ color: "white", fill: "white" }} />
            ) : (
              <Menu style={{ color: "white", fill: "white" }} />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, text, active, alert }) => {
  const { expanded } = useContext(SidebarContext);
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-gray-500 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden text-white transition-all ${
          expanded ? "w-36 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export { SidebarItem, Sidebar };
