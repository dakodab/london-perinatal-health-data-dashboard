const indicatorSentences = {
    // key is the indicator name or ID (whichever you prefer)
    'Early Access to Maternity Care': (value, time) =>
      `${value}% of pregnant people had early access to maternity care as of ${time}`,
  
    'General fertility rate': (value, time) =>
      `The general fertility rate was ${value} births per 1,000 women in ${time}`,
  
    'Percentage of deliveries to women from ethnic minority groups': (value, time) =>
      `${value}% of deliveries were to women from ethnic minority groups in ${time}`,
  
    // fallback example (optional)
    default: (name, value, time, unit = '') =>
      `${value}${unit ? ' ' + unit : ''} for ${name} in ${time}`
  };
  
  export default indicatorSentences;