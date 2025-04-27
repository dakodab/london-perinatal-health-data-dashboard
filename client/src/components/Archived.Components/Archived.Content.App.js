// // archived content from App.js //

//   // Life expectancy at birth - MISLABELED in Fingertips API itself as "Infant Mortality (alt method)" { id: '90366', name: 'Infant Mortality (alt method)', unit: '', rows: 1984 },

//   // what is this??? { id: '90362', name: 'Infant Mortality Rate (3-year average)', unit: '%', rows: 704 },
  
//   // 2023/24 - Value not published for several years due to data quality reasons - decided to omit indicator//
  
//   // out of date //
//   // { id: '93580', name: "Baby's first feed breastmilk (previous method)", unit: '%', rows: 43 },
//   //  { id: '93579', name: 'Smoking in early pregnancy (previous method)', unit: '%', rows: 32 },
//   // { id: '93583', name: 'Early access to maternity care (previous method)', unit: '%', rows: 32 },
//   // { id: '93584', name: 'Obesity in early pregnancy (previous method)', unit: '%', rows: 31 },
//   // { id: '93586', name: 'Folic acid supplements before pregnancy (previous method)', unit: '%', rows: 28 },
  
//   // No data available with this get - ID likely does not match any data collected at this geo level //
//   // { id: '92517', name: 'Breastfeeding prevalence at 6 to 8 weeks - current method', unit: '%', rows: 22 }, //
//   // { id: '92250', name: 'Percentage of deliveries to women aged 35 years and above', unit: '%' },
//   // { id: '92705', name: 'Neonatal mortality rate', unit: ' per 1,000' },
//   // { id: '92706', name: 'Post-neonatal mortality rate', unit: ' per 1,000' },
//   // { id: '92974', name: 'Percentage of deliveries to women from ethnic minority groups' },
//   // { id: '92975', name: 'Caesarean section % - CCG' },
//  // { id: '92976', name: 'Percentage of deliveries to women aged 35 years or above - CCG' },
//  // { id: '92756', name: 'Teenage mothers - CCG' },
//  // { id: '93634', name: 'Drug misuse in early pregnancy' },
//  // { id: '93585', name: 'Drinking in early pregnancy' },
//  // { id: '93614', name: "Baby's first feed breastmilk (previous method ) - CCG" }


//   // { id: '94120', name: 'Unknown specific indicator 94120', rows: 130 }, // unknown?
//   // { id: '94131', name: 'Unknown specific indicator 94131', rows: 43 }, // unknown?
//   // { id: '94125', name: 'Unknown specific indicator 94125', rows: 14 } // unknown?







// // useState 1 - holds data from the Fingertips API //
//   const [data, setData] = useState(null); 

//   // useState 2 - holds data from the MySQL database //
//   const [dbData, setDbData] = useState([]); 

//   // useEffect 1 - data from API //
//   useEffect(() => {
//   // runs when the page loads //
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5001/api/fingertips');
//         const result = await response.json();
//         console.log("Fetched data from backend:", result); // just to check
//         console.log("Example item:", result[0]);

//         //map() transforms each group into its .Data array. flatMap() flattens into one single array //
//         const allDataRows = result.flatMap(group => group.Data);
//         setData(allDataRows);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
  
//     fetchData(); // run it
//   }, []);

//   // useEffect 2 - data from database //
//   useEffect(() => { 
//   // runs when the page loads
//     fetch('http://localhost:5001/api/railway/data') // fetch --> Express --> Railway
//       .then(response => response.json())
//       .then(json => {
//         console.log("Fetched from DB:", json);
//         setDbData(json); // saves data
//       })
//       .catch(err => {
//         console.error("Error fetching DB data:", err);
//       });
//   }, []);

//         {/* 
//         <h2>Live Data from MySQL Database</h2>
//           <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
//             <thead>
//               <tr>
//                 <th>Indicator ID</th>
//                 <th>Area Name</th>
//                 <th>Time Period</th>
//                 <th>Value</th>
//               </tr>
//             </thead>
//             <tbody>
//                {Array.isArray(dbData) && dbData.length > 0 ? (
//                 dbData.map((row, index) => (
//                 <tr key={index}>
//                   <td>{row.indicator_id}</td>
//                   <td>{row.area_name}</td>
//                   <td>{row.time_period}</td>
//                   <td>{row.value}</td>
//                 </tr>
//                 ))
//                ) : (
//                 // stops crash - displays message //
//                 <tr>
//                   <td colSpan="4">⚠️ No data available — database connection failed</td>
//                 </tr>
//                 )
//               }
//             </tbody>
//           </table>
//         */}
