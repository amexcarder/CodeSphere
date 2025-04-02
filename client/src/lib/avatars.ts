// Color palette
const backgrounds = ['#ccff00', '#4DFFEF', '#FF479F', '#9F45FF', '#FF7846', '#FFE64D'];
const backgrounds2 = ['#F733FF', '#33C5FF', '#33FF8D', '#FF3358', '#FFA833'];

export const getRandomAvatarSvg = (seed: number, width = 200, height = 200): string => {
  // Use seed to determine features deterministically
  const bgIndex = seed % backgrounds.length;
  const bgColor = backgrounds[bgIndex];
  
  const type = (seed % 3); // 0 = monkey, 1 = robot, 2 = alien
  
  if (type === 0) {
    // Monkey avatar
    const hasHeadphones = seed % 2 === 0;
    const headphonesElements = hasHeadphones ? 
      `<rect x="25" y="20" width="70" height="8" rx="4" fill="#444" />
       <rect x="50" y="0" width="20" height="25" rx="10" fill="#444" />` : '';
      
    return `<svg width="${width}" height="${height}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="${bgColor}" />
      <g transform="translate(40, 40)">
        <ellipse cx="60" cy="60" rx="50" ry="55" fill="#8D5524" />
        <ellipse cx="60" cy="55" rx="40" ry="45" fill="#A56E3C" />
        <circle cx="40" cy="45" r="10" fill="white" />
        <circle cx="80" cy="45" r="10" fill="white" />
        <circle cx="40" cy="45" r="5" fill="black" />
        <circle cx="80" cy="45" r="5" fill="black" />
        <ellipse cx="60" cy="70" rx="10" ry="5" fill="#8D5524" />
        <path d="M45,85 Q60,95 75,85" stroke="black" stroke-width="3" fill="none" />
        ${headphonesElements}
      </g>
    </svg>`;
  } else if (type === 1) {
    // Robot avatar
    return `<svg width="${width}" height="${height}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="${bgColor}" />
      <g transform="translate(50, 50)">
        <rect x="15" y="0" width="70" height="80" rx="10" fill="#555" />
        <rect x="25" y="10" width="20" height="15" rx="3" fill="#333" />
        <rect x="55" y="10" width="20" height="15" rx="3" fill="#333" />
        <rect x="30" y="12" width="10" height="10" rx="5" fill="#44ffff" />
        <rect x="60" y="12" width="10" height="10" rx="5" fill="#44ffff" />
        <rect x="35" y="40" width="30" height="5" rx="2" fill="#333" />
        <rect x="35" y="50" width="30" height="5" rx="2" fill="#333" />
        <rect x="35" y="60" width="30" height="5" rx="2" fill="#333" />
        <circle cx="35" cy="90" r="10" fill="#555" />
        <circle cx="65" cy="90" r="10" fill="#555" />
      </g>
    </svg>`;
  } else {
    // Alien avatar
    return `<svg width="${width}" height="${height}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="${bgColor}" />
      <g transform="translate(50, 30)">
        <ellipse cx="50" cy="55" rx="40" ry="50" fill="#96D636" />
        <ellipse cx="30" cy="40" rx="20" ry="30" fill="${bgColor}" />
        <ellipse cx="70" cy="40" rx="20" ry="30" fill="${bgColor}" />
        <circle cx="30" cy="40" r="10" fill="black" />
        <circle cx="70" cy="40" r="10" fill="black" />
        <circle cx="30" cy="40" r="5" fill="white" />
        <circle cx="70" cy="40" r="5" fill="white" />
        <ellipse cx="50" cy="75" rx="5" ry="10" fill="black" />
        <path d="M30,90 Q50,100 70,90" stroke="black" stroke-width="2" fill="none" />
        <path d="M20,15 L35,35 M80,15 L65,35" stroke="black" stroke-width="2" />
      </g>
    </svg>`;
  }
};
