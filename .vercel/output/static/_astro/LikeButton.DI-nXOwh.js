import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as t}from"./index.BVOCwoKb.js";const I=()=>{const[h,p]=t.useState(0),[r,o]=t.useState(!1),[C,k]=t.useState(!1),[n,l]=t.useState(!1),[v,c]=t.useState(!1),[u,d]=t.useState(!1),f=typeof window<"u"?"https://aaayushh7.vercel.app":"";t.useEffect(()=>{k(!0);const e=localStorage.getItem("websiteIsLiked");e&&o(e==="true"),i();const a=setInterval(i,5e3);return()=>clearInterval(a)},[]);const i=async()=>{try{const a=await(await fetch(`${f}/api/likes`)).json();a.likes!==void 0&&(p(a.likes),c(!0),setTimeout(()=>c(!1),300))}catch(e){console.error("Error fetching likes:",e)}},m=()=>{l(!0),setTimeout(()=>{l(!1)},300)},g=async()=>{if(!u){if(r){m();return}try{d(!0),(await fetch(`${f}/api/likes`,{method:"POST"})).ok&&(o(!0),localStorage.setItem("websiteIsLiked","true"),m(),i())}catch(e){console.error("Error updating likes:",e)}finally{d(!1)}}};if(!C)return null;const w=r?"border-[var(--sec)]":"border-[var(--white-icon)]",x=`
    w-6 h-6 transition-all duration-300 ease-in-out 
    ${r?"text-[var(--sec)] scale-110":"text-[var(--white-icon)] group-hover:text-[var(--white)] group-hover:scale-105"}
    ${n?" animate-scale":""}
  `;return s.jsx("div",{className:"flex items-center",children:s.jsxs("button",{onClick:g,disabled:u,className:`
          group relative w-40 h-10 flex items-center justify-center p-3
          rounded-full transition-all duration-300 ease-in-out transform border-2 ${w}
          ${r?"":"md:hover:border-[var(--white)]"}
          ${n?" animate-scale":""}
        `,children:[s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",className:x,children:s.jsx("path",{d:"M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"})}),s.jsxs("span",{className:`
          text-sm pl-3 transition-all duration-300 ease-in-out ${v?"animate-scale":""}
          text-[var(--white)]
        `,children:[h," Likes"]})]})})};export{I as default};
