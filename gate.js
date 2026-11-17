(function(){
var H="e0f0291457e9a8a7baf520de2fd00ae102f8e6f61696bee8b5f5ce60ba0f6f3e";
if(!(window.crypto&&crypto.subtle)||location.protocol!=="https:")return; // local testing over http: no lock
try{if(localStorage.getItem("spark-unlock")===H)return}catch(e){}
var o=document.createElement("div");
o.style.cssText="position:fixed;inset:0;z-index:99999;background:#131f24;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px;font-family:-apple-system,system-ui,sans-serif;color:#fff;text-align:center";
o.innerHTML='<div style="font-size:44px;font-weight:800;color:#58cc02;margin-bottom:6px">Spark</div><div style="font-size:18px;color:#afafaf;margin-bottom:28px">Enter your password</div><input id="gp" type="password" autocapitalize="none" autocomplete="current-password" style="width:100%;max-width:320px;font-size:20px;padding:14px 16px;border-radius:14px;border:2px solid #37464f;background:#1f2c34;color:#fff;outline:none"><div id="ge" style="color:#ff4b4b;height:24px;margin:10px 0;font-size:16px"></div><button id="gb" style="width:100%;max-width:320px;font-size:19px;font-weight:800;padding:15px;border:0;border-radius:14px;background:#58cc02;color:#fff">Unlock</button>';
function go(){var v=document.getElementById("gp").value.trim().toLowerCase();
crypto.subtle.digest("SHA-256",new TextEncoder().encode("spark:"+v)).then(function(b){
var x=Array.from(new Uint8Array(b)).map(function(n){return n.toString(16).padStart(2,"0")}).join("");
if(x===H){try{localStorage.setItem("spark-unlock",H)}catch(e){}o.remove()}else{document.getElementById("ge").textContent="Wrong password"}})}
document.addEventListener("DOMContentLoaded",function(){document.body.appendChild(o);document.getElementById("gb").onclick=go;document.getElementById("gp").onkeydown=function(e){if(e.key==="Enter")go()}});
if(document.readyState!=="loading"){document.body.appendChild(o);document.getElementById("gb").onclick=go;document.getElementById("gp").onkeydown=function(e){if(e.key==="Enter")go()}}
})();
