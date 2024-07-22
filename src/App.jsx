import { useState, useEffect, useRef } from "react";
import { Alert } from "@mui/material";
import Style from "./styles.module.css";
const App = () => {
  const [data, setData] = useState();
  const [isDebounce, setDebounce] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const debounceTimer = useRef(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isDebounce) {
        setCountdown(countdown - 1);
      }
    }, 1000);
    if (countdown === 0) {
      clearTimeout(timer);
      setCountdown(10);
    }
    console.log(countdown);
  }, [isDebounce, countdown, isLoading]);
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);
  const fetchData = async () => {
    const response = await fetch("https://reqres.in/api/users?page=2", {
      method: "GET",
    });
    const json = await response.json();
    setData(json);
    console.log(json, data);
    //try after completion of the api call start timer
  };
  const handleClick = () => {
    if (isDebounce) return;
    setDebounce(true);
    fetchData();
    setIsLoading(true);
    debounceTimer.current = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    debounceTimer.current = setTimeout(() => {
      setDebounce(false);
    }, 10000);
  };

  return (
    <div>
      <button onClick={handleClick}>Click Here</button>
      {isDebounce && countdown > 0 && <div>{countdown} seconds remaining</div>}
      {isLoading && (
        <div className={Style.alert}>
          <Alert severity="success">Data is loading !</Alert>
        </div>
      )}
      {isLoading ? <p>Loading...</p> : <div>{JSON.stringify(data)}</div>}
    </div>
  );
};
export default App;
