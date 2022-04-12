import React, { useRef, useState } from "react";
import "./styles.css";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-dropdown-menu-component-with-react-hooks
 */
export default function App(props) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  };
  const [ role, setRole ] = useState("Choose A Role")

  return (
    <div>
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>{role}</span>
        </button>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>
              <button onClick={(e) => {
                e.preventDefault()
                setRole("President")
                setIsActive(!isActive)
                props.getRole("President")
                }}>
                President
              </button>
            </li>
            <li>
              <button onClick={(e) => {
                e.preventDefault()
                setRole("Vice President")
                setIsActive(!isActive)
                props.getRole("Vice President")
                }}>
                Vice President
              </button>
            </li>
            <li>
              <button onClick={(e) => {
                e.preventDefault()
                setRole("Departmental Head")
                setIsActive(!isActive)
                props.getRole("Departmental Head")
                }}>
                Departmental Head
              </button>
            </li>
            <li>
              <button onClick={(e) => {
                e.preventDefault()
                setRole("Team Lead")
                setIsActive(!isActive)
                props.getRole("Team Lead")
                }}>
                Team Lead
              </button>
            </li>
            <li>
              <button onClick={(e) => {
                e.preventDefault()
                setRole("Team Member")
                setIsActive(!isActive)
                props.getRole("Team Member")
                }}>
                Team Member
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
