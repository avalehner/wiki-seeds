import localFont from 'next/font/local'; 

const linuxLibertine = localFont({
  src: '../../public/fonts/LinLibertine_Rah.ttf',
  variable: '--linux-libertine', 
});
console.log(linuxLibertine)

export default linuxLibertine;