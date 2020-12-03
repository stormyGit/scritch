import React, {useRef, useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import {useTheme} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const duration = 100;

const styles = theme => ({
  root: {
    cursor: "pointer",
    filter: "drop-shadow(8px 8px 10px rgba(0,0,0,0.2))",
    "&:hover": {
      fill: theme.palette.secondary.dark
    },
  },
  pawAnim: {},
  pawAdd: {}
});

const lineProps = {
  strokeOpacity: 1,
  strokeWidth: 1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
}

function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

function ScritchButton({color, size, onClick, children, classes}) {
  const theme = useTheme();
  const pawZoomFactor = 2.5;
  const c = theme.palette[color].main;
  const [eleSize, setEleSize] = useState(size);
  const [pawOpen, setPawOpen] = useState(false);
  const [pawClicked, setPawClicked] = useState(false);
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  let timer = undefined;
  countRef.current = count;

  function OnSVGClicked() {
    if (!pawClicked) {
      setPawClicked(true);
      if (pawOpen)
        onClick();
      timer = setInterval(() => {
        OnAnimationUpdate();
      }, 1);
      const elements = document.getElementsByClassName(classes.pawAnim);
      for (let i = 0; i < elements.length; i++) {
        elements[i].beginElement();
      }
    }
  }

  function OnAnimationUpdate() {
    const d = duration / 2;
    if (countRef.current < d) {
      setCount(countRef.current + 1);
      if (pawOpen)
        setEleSize(lerp(size, size * pawZoomFactor, 1 - (countRef.current / d)));
      else
        setEleSize(lerp(size, size * pawZoomFactor, countRef.current / d));
    } else {
      OnAnimationEnd();
    }
  }

  function OnAnimationEnd() {
    setCount(0);
    setPawOpen(!pawOpen);
    setPawClicked(false);
    clearInterval(timer);
    if (!pawOpen)
      onClick();
  }

  const d_plus = "M 36.242641,37.656854 32,33.414214 27.757359,37.656854 26.343146,36.242641 30.585786,32 26.343146,27.757359 27.757359,26.343146 32,30.585786 36.242641,26.343146 37.656854,27.757359 33.414214,32 l 4.24264,4.242641 z";
  // const d_plus = "M 35.242641,40.656854 31,36.414214 26.757359,40.656854 25.343146,39.242641 29.585786,35 25.343146,30.757359 26.757359,29.343146 31,33.585786 35.242641,29.343146 36.656854,30.757359 32.414214,35 l 4.24264,4.242641 z";
  const d_cross = "m 38,40 h -6 v 6 h -2 v -6 h -6 v -2 h 6 v -6 h 2 v 6 h 6 z";
  return (
    <div>
      <svg className={classes.root} height={eleSize} width={eleSize} viewBox="0 0 64 64" fill={c} {...lineProps}
           onClick={() => {
             OnSVGClicked();
           }}>

        {!pawOpen && <path
          d="M 30.29162,8.0387764 C 18.562098,8.6869473 8.7405455,19.398494 8.0504585,30.456162 7.6369055,37.082815 9.764774,43.529881 14.45843,48.376245 c 5.787025,5.97531 12.589074,7.615713 17.183082,7.623692 2.259557,0.0039 10.436211,-0.14955 17.328212,-6.974402 C 56.142766,41.92238 57.375917,32.006988 54.694813,24.069522 51.792461,15.47706 42.407681,7.3692469 30.29162,8.0387764 Z;">
          <animate id="paw-pad"
                   className={classes.pawAnim}
                   attributeName="d"
                   dur={duration + "ms"}
                   begin="indefinite"
                   repeatCount="1"
                   fill="freeze"
                   values="M 30.29162,8.0387764 C 18.562098,8.6869473 8.7405455,19.398494 8.0504585,30.456162 7.6369055,37.082815 9.764774,43.529881 14.45843,48.376245 c 5.787025,5.97531 12.589074,7.615713 17.183082,7.623692 2.259557,0.0039 10.436211,-0.14955 17.328212,-6.974402 C 56.142766,41.92238 57.375917,32.006988 54.694813,24.069522 51.792461,15.47706 42.407681,7.3692469 30.29162,8.0387764 Z;

                     m 32.000288,21.616689 c -9.926141,10e-7 -23.9997341,15.708859 -23.9997355,25.624788 1.4e-6,4.465942 3.3512125,7.133991 8.9674015,7.133991 6.104934,-2e-6 10.13614,-3.209336 15.032336,-3.209337 4.938695,0 8.98115,3.209336 15.032335,3.209337 5.616189,-10e-7 8.9674,-2.668049 8.967402,-7.133991 -1e-6,-9.91593 -14.073596,-25.624789 -23.999739,-25.624788 z;"/>
        </path>}

        {!pawOpen && <path>
          <animate id="beans"
                   attributeName="d"
                   className={classes.pawAnim}
                   dur={duration + "ms"}
                   begin="indefinite"
                   fill="freeze"
                   repeatCount="1"
                   values="m 36.462917,41.170252 c -1.299996,-4.433957 -5.304961,-7.305479 -8.944919,-6.414856 -3.639962,0.890621 -5.536183,5.206844 -4.236187,9.640802 1.299995,4.433956 5.304961,7.305478 8.94492,6.414856 3.63996,-0.890624 5.536183,-5.206845 4.236186,-9.640802 z m 0.913226,7.247146 c 3.867458,-1.04162 5.802427,-6.390512 4.322432,-11.946713 -1.479996,-5.556204 -5.814958,-9.214705 -9.682416,-8.173086 -3.867458,1.04162 -5.802427,6.390514 -4.322432,11.946714 1.479997,5.556202 5.81621,9.215983 9.682416,8.173085 z m 3.308825,-17.362935 c -3.639964,-0.890637 -7.643666,1.980867 -8.944894,6.414817 -1.299976,4.433952 0.59626,8.750184 4.236226,9.640823 3.639963,0.890637 7.643667,-1.980869 8.944892,-6.414821 1.299979,-4.433951 -0.596259,-8.750183 -4.236224,-9.640819 z m -7.608766,16.76259 c 3.867461,1.041636 8.202408,-2.616849 9.682383,-8.173042 1.479972,-5.556197 -0.455018,-10.90382 -4.322478,-11.946733 -3.867463,-1.042914 -8.20241,2.616848 -9.682384,8.173042 -1.479973,5.556199 0.455016,10.905099 4.322479,11.946733 z;
                     M 13.590818,22.95631 C 12.290821,18.522352 8.2858577,15.65083 4.6458979,16.541452 1.0059365,17.432074 -0.89028446,21.748297 0.40971024,26.182255 1.7097058,30.616212 5.7146719,33.487734 9.3546319,32.597112 12.994591,31.706488 14.890814,27.390267 13.590818,22.95631 Z m 10.589883,-2.659071 c 3.867458,-1.041621 5.802426,-6.390512 4.322433,-11.9467134 -1.479998,-5.5562043 -5.81496,-9.21470443 -9.682417,-8.1730862 -3.867458,1.04162 -5.802428,6.3905141 -4.322432,11.9467146 1.479996,5.556202 5.816211,9.215982 9.682416,8.173085 z m 35.173374,-3.754394 c -3.639963,-0.890637 -7.643665,1.980867 -8.944892,6.414817 -1.299978,4.433952 0.596259,8.750184 4.236225,9.640823 3.639963,0.890637 7.643666,-1.980869 8.944892,-6.414822 1.299979,-4.433951 -0.59626,-8.750182 -4.236225,-9.640818 z M 39.820539,20.297269 C 43.688,21.338905 48.022947,17.680422 49.502922,12.124228 50.982894,6.5680315 49.047905,1.2204094 45.180443,0.17749528 41.312982,-0.86541948 36.978033,2.7943422 35.498059,8.3505373 34.018086,13.906736 35.953077,19.255636 39.820539,20.297269 Z;"/>
        </path>}
        {pawOpen && <path
          d="m 32.000288,21.616689 c -9.926141,10e-7 -23.9997341,15.708859 -23.9997355,25.624788 1.4e-6,4.465942 3.3512125,7.133991 8.9674015,7.133991 6.104934,-2e-6 10.13614,-3.209336 15.032336,-3.209337 4.938695,0 8.98115,3.209336 15.032335,3.209337 5.616189,-10e-7 8.9674,-2.668049 8.967402,-7.133991 -1e-6,-9.91593 -14.073596,-25.624789 -23.999739,-25.624788 z;">
          <animate id="paw-pad"
                   className={classes.pawAnim}
                   attributeName="d"
                   dur={duration + "ms"}
                   begin="indefinite"
                   repeatCount="1"
                   fill="freeze"
                   values="
                     m 32.000288,21.616689 c -9.926141,10e-7 -23.9997341,15.708859 -23.9997355,25.624788 1.4e-6,4.465942 3.3512125,7.133991 8.9674015,7.133991 6.104934,-2e-6 10.13614,-3.209336 15.032336,-3.209337 4.938695,0 8.98115,3.209336 15.032335,3.209337 5.616189,-10e-7 8.9674,-2.668049 8.967402,-7.133991 -1e-6,-9.91593 -14.073596,-25.624789 -23.999739,-25.624788 z;
                     M 30.29162,8.0387764 C 18.562098,8.6869473 8.7405455,19.398494 8.0504585,30.456162 7.6369055,37.082815 9.764774,43.529881 14.45843,48.376245 c 5.787025,5.97531 12.589074,7.615713 17.183082,7.623692 2.259557,0.0039 10.436211,-0.14955 17.328212,-6.974402 C 56.142766,41.92238 57.375917,32.006988 54.694813,24.069522 51.792461,15.47706 42.407681,7.3692469 30.29162,8.0387764 Z;
                     "/>
        </path>}

        {pawOpen && <path
          d="M 13.590818,22.95631 C 12.290821,18.522352 8.2858577,15.65083 4.6458979,16.541452 1.0059365,17.432074 -0.89028446,21.748297 0.40971024,26.182255 1.7097058,30.616212 5.7146719,33.487734 9.3546319,32.597112 12.994591,31.706488 14.890814,27.390267 13.590818,22.95631 Z m 10.589883,-2.659071 c 3.867458,-1.041621 5.802426,-6.390512 4.322433,-11.9467134 -1.479998,-5.5562043 -5.81496,-9.21470443 -9.682417,-8.1730862 -3.867458,1.04162 -5.802428,6.3905141 -4.322432,11.9467146 1.479996,5.556202 5.816211,9.215982 9.682416,8.173085 z m 35.173374,-3.754394 c -3.639963,-0.890637 -7.643665,1.980867 -8.944892,6.414817 -1.299978,4.433952 0.596259,8.750184 4.236225,9.640823 3.639963,0.890637 7.643666,-1.980869 8.944892,-6.414822 1.299979,-4.433951 -0.59626,-8.750182 -4.236225,-9.640818 z M 39.820539,20.297269 C 43.688,21.338905 48.022947,17.680422 49.502922,12.124228 50.982894,6.5680315 49.047905,1.2204094 45.180443,0.17749528 41.312982,-0.86541948 36.978033,2.7943422 35.498059,8.3505373 34.018086,13.906736 35.953077,19.255636 39.820539,20.297269 Z;">
          <animate id="beans"
                   attributeName="d"
                   className={classes.pawAnim}
                   dur={duration + "ms"}
                   begin="indefinite"
                   fill="freeze"
                   repeatCount="1"
                   values="M 13.590818,22.95631 C 12.290821,18.522352 8.2858577,15.65083 4.6458979,16.541452 1.0059365,17.432074 -0.89028446,21.748297 0.40971024,26.182255 1.7097058,30.616212 5.7146719,33.487734 9.3546319,32.597112 12.994591,31.706488 14.890814,27.390267 13.590818,22.95631 Z m 10.589883,-2.659071 c 3.867458,-1.041621 5.802426,-6.390512 4.322433,-11.9467134 -1.479998,-5.5562043 -5.81496,-9.21470443 -9.682417,-8.1730862 -3.867458,1.04162 -5.802428,6.3905141 -4.322432,11.9467146 1.479996,5.556202 5.816211,9.215982 9.682416,8.173085 z m 35.173374,-3.754394 c -3.639963,-0.890637 -7.643665,1.980867 -8.944892,6.414817 -1.299978,4.433952 0.596259,8.750184 4.236225,9.640823 3.639963,0.890637 7.643666,-1.980869 8.944892,-6.414822 1.299979,-4.433951 -0.59626,-8.750182 -4.236225,-9.640818 z M 39.820539,20.297269 C 43.688,21.338905 48.022947,17.680422 49.502922,12.124228 50.982894,6.5680315 49.047905,1.2204094 45.180443,0.17749528 41.312982,-0.86541948 36.978033,2.7943422 35.498059,8.3505373 34.018086,13.906736 35.953077,19.255636 39.820539,20.297269 Z;
                     m 36.462917,41.170252 c -1.299996,-4.433957 -5.304961,-7.305479 -8.944919,-6.414856 -3.639962,0.890621 -5.536183,5.206844 -4.236187,9.640802 1.299995,4.433956 5.304961,7.305478 8.94492,6.414856 3.63996,-0.890624 5.536183,-5.206845 4.236186,-9.640802 z m 0.913226,7.247146 c 3.867458,-1.04162 5.802427,-6.390512 4.322432,-11.946713 -1.479996,-5.556204 -5.814958,-9.214705 -9.682416,-8.173086 -3.867458,1.04162 -5.802427,6.390514 -4.322432,11.946714 1.479997,5.556202 5.81621,9.215983 9.682416,8.173085 z m 3.308825,-17.362935 c -3.639964,-0.890637 -7.643666,1.980867 -8.944894,6.414817 -1.299976,4.433952 0.59626,8.750184 4.236226,9.640823 3.639963,0.890637 7.643667,-1.980869 8.944892,-6.414821 1.299979,-4.433951 -0.596259,-8.750183 -4.236224,-9.640819 z m -7.608766,16.76259 c 3.867461,1.041636 8.202408,-2.616849 9.682383,-8.173042 1.479972,-5.556197 -0.455018,-10.90382 -4.322478,-11.946733 -3.867463,-1.042914 -8.20241,2.616848 -9.682384,8.173042 -1.479973,5.556199 0.455016,10.905099 4.322479,11.946733 z;"/>
        </path>}
        {pawOpen && <path
          d={d_cross}
          fill="#000000"
          className={classes.pawAdd}>
          <animate id="beans"
                   attributeName="d"
                   className={classes.pawAnim}
                   dur={duration + "ms"}
                   begin="indefinite"
                   fill="freeze"
                   repeatCount="1"
                   values={d_cross + ";" + d_plus + ";"}/>
        </path>}
        {!pawOpen && <path
          d={d_plus}
          fill="#000000"
          className={classes.pawAdd}>
          <animate id="beans"
                   attributeName="d"
                   className={classes.pawAnim}
                   dur={duration + "ms"}
                   begin="indefinite"
                   fill="freeze"
                   repeatCount="1"
                   values={d_plus + ";" + d_cross + ";"}/>
        </path>}
      </svg>
    </div>
  );
}

export default withStyles(styles, {pureComponent: true})(ScritchButton);
