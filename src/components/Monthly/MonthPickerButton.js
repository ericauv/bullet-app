import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class MonthPickerButton extends React.Component{

    state = {
        selected: null
    }
    static propTypes = {
        dateForPicker: PropTypes.instanceOf(Date),
    }
    render(){
        return()
    }
}