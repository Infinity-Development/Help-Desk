/** @jsx jsx */
import { jsx } from "theme-ui"

const Logo = (props) => (
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <image href="https://cdn.infinitybots.xyz/images/png/Infinity5.png" height="125" width="125"/>
</svg>
)

Logo.defaultProps = {
  color: "white",
}

export default Logo
