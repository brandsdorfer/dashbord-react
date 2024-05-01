import toast from 'react-hot-toast';


export const toastFire = (status,message) => {

  const styles = status ? {background:"green" , color:"white"} : {background:"red" , color:"white"}
  const action = status ? 'success' : 'error';
  
  toast[action](message, {
    duration: 4000,
    position: 'top-center',
  
    // Styling
    style: styles,
  
    // Custom Icon
    icon: '👏',
  
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },
  
    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  })
};