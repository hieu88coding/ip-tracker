import React from "react";
import ArrowIcon from "../../assets/images/icon-arrow.svg";
import "./mainScreen.scss";
import MapView from "../../components/map/MapContainer";
import { useState } from "react";
import { detectInputType } from "../../helper/IpSelector";

import axios from "axios";
import type { IData } from "../../types/data";
const BASE_URL = "https://geo.ipify.org/api/v2/country,city";
const API_KEY = "at_qd2m5Nh720P7NqtiMLdvLpWa3yzrF";

const MainScreen = () => {
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<IData>();
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSearch = async () => {
    let type = detectInputType(input);
    let stringParam = "";
    if (type === "ipv4" || type == "ipv6") {
      stringParam = `ipAddress=${input}`;
    } else if (type === "domain") {
      stringParam = `domain=${input}`;
    } else {
      return alert("Input not valid IPs or Domains");
    }
    try {
      let res: any = await axios.get(
        `${BASE_URL}?apiKey=${API_KEY}&${stringParam}&reverseIp=1`
      );
      console.log("data", res);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-container">
      <div className="top-container">
        <div className="top-title">IP Address Tracker</div>
        <div className="top-search">
          <input
            onChange={handleChangeInput}
            className="top-input"
            placeholder="Search for any IP Address or Domain"
            type="text"
          />
          <div className="top-icon" onClick={handleSearch}>
            <img src={ArrowIcon} />
          </div>
        </div>
      </div>
      <div className="mid-container">
        <div className="mid-item">
          <div className="item-title">IP Address</div>
          <div className="item-value">{data?.ip || "Unknown"}</div>
        </div>
        <div className="mid-item">
          <div className="item-title">Location</div>
          <div className="item-value">
            {data?.location?.region || "Unknown"},{data?.location?.city},
            {data?.location?.country}
          </div>
        </div>
        <div className="mid-item">
          <div className="item-title">Timezone</div>
          <div className="item-value">
            {"UTC " + data?.location?.timezone || "Unknown"}
          </div>
        </div>
        <div className="mid-item">
          <div className="item-title">ISP</div>
          <div className="item-value">{data?.isp || "Unknown"}</div>
        </div>
      </div>
      <div className="bot-container">
        <MapView
          center={
            data?.location?.lat
              ? [data.location.lat, data.location.lng]
              : [51.505, -0.09]
          }
          zoom={13}
        />
      </div>
    </div>
  );
};

export default MainScreen;
