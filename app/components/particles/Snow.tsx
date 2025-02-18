'use client'

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

export function Snow() {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
    //   await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  // snow preset
  // https://dev.to/tsparticles/how-to-create-snow-effects-for-this-christmas-with-tsparticles-4mpd
  const options: ISourceOptions = useMemo(
    () => ({
        "particles":{
           "color":{
              "value":"#fff"
           },
           "move":{
              "direction":"bottom",
              "enable":true,
              "outModes":"out",
              "speed":2
           },
           "number":{
              "density":{
                 "enable":true,
                 "area":800
              },
              "value":400
           },
           "opacity":{
              "value":0.7
           },
           "shape":{
              "type":"circle"
           },
           "size":{
              "value":10
           },
           "wobble":{
              "enable":true,
              "distance":10,
              "speed":10
           },
           "zIndex":{
              "value":{
                 "min":0,
                 "max":100
              }
           }
        }
     }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};