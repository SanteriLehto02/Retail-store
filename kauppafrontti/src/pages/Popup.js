import React from "react";
import "./Popup.css";
import { useNavigate } from "react-router-dom";

export default function Popup(props) {
 
  return props.trigger ? (
    <div className="popupcontainer">{props.children}</div>
  ) : null;
}