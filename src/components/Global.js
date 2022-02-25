import React from 'react'
import { Global } from '@emotion/core'

export default props =>
  <Global
    styles={theme => ({
      body: {
        backgroundColor: '#16151D',
      }
    })}
  />