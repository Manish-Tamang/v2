"use client"
import React from "react";
import { FacebookProvider, CustomChat } from "react-facebook";
const FacebookMsg = () => {
  return (
    <FacebookProvider appId="350294627842238" chatSupport>
      <CustomChat pageId="246142438578446" minimized={true} />
    </FacebookProvider>
  );
};

export default FacebookMsg;
