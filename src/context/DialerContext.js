import React, {
    createContext,
    useState,
    useEffect
  } from 'react';
  import PropTypes from 'prop-types';
  import _ from 'lodash';
  import { states } from "src/constants";
  import { useDispatch } from 'react-redux';
  import { saveCallLog } from 'src/actions/dialActions'
  const DialerContext = createContext();
  

  
  export function DialerProvider({ settings, children }) {
    const [currentDevice, setCurrentDevice] = useState(null);
    const [state, setState] = useState(null);
    const [conn, setConn] = useState(null);

    const updateDialerDevice = (newDevice = {}) => {
        setCurrentDevice(newDevice);
    };

    const dispatch = useDispatch();

    const getDialerDevice = ()=>{
        return currentDevice;
    }
    useEffect(()=>{
      if(currentDevice){
        
        currentDevice.on("ready", () => {
          console.log("===============ready========================");
          setState(states.READY);
        });
        currentDevice.on("connect", connection => {
          console.log("===============connect========================", connection);
          setConn(connection);
          setState(states.ON_CALL);
        });
        currentDevice.on("disconnect", (connection) => {
          console.log("===============disconnect========================", connection);
          let data = {
            callSid: connection.parameters.CallSid,
            To: connection.message.To,
            leadStatus: 'approved',
            remarks: `outgoing_call to ${connection.message.To}`
          }
          dispatch( saveCallLog(data) )
        });
        currentDevice.on("cancel", () => {
          setState(states.READY);
          setConn(null);
        });
        currentDevice.on("reject", () => {
          setState(states.READY);
          setConn(null);
        });
      }
    }, [currentDevice])
  
    return (
      <DialerContext.Provider
        value={{
          device: currentDevice,
          updateDevice: updateDialerDevice,
          getDevice: getDialerDevice,
          connection: conn
        }}
      >
        {children}
      </DialerContext.Provider>
    );
  }
  
  DialerProvider.propTypes = {
    children: PropTypes.node.isRequired,
    device: PropTypes.object,
    updateDevice: PropTypes.func,
    getDevice: PropTypes.func
  };
  
  export const DialerConsumer = DialerContext.Consumer;
  
  export default DialerContext;
  