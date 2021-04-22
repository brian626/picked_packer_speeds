import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'
import ls from 'local-storage'
import dayjs from 'dayjs'

import styled from 'styled-components'

import Button from 'react-bootstrap/Button'

import 'react-table-6/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const DisabledLink = styled.div`
    color: #cccccc;
`

const StartPick = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const StopPick = styled.div`
    color: #ff0000;
    cursor: pointer;
`

const StartPack = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const StopPack = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class StartOrderPick extends Component {
    startOrderPick = event => {
        event.preventDefault()

        api.startPick(this.props.id)

        window.location.reload()
    }

    render() {
        return <StartPick onClick={this.startOrderPick}>Start Pick</StartPick>
    }
}

class StopOrderPick extends Component {
    stopOrderPick = event => {
        event.preventDefault()

        api.stopPick(this.props.id)

        window.location.reload()
    }

    render() {
        return <StopPick onClick={this.stopOrderPick}>Stop Pick</StopPick>
    }
}

class StartOrderPack extends Component {
    startOrderPack = event => {
        event.preventDefault()

        api.startPack(this.props.id)

        window.location.reload()
    }

    render() {
        return <StartPack onClick={this.startOrderPack}>Start Pack</StartPack>
    }
}

class StopOrderPack extends Component {
    stopOrderPack = event => {
        event.preventDefault()

        api.stopPack(this.props.id)

        window.location.reload()
    }

    render() {
        return <StopPack onClick={this.stopOrderPack}>Stop Pack</StopPack>
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            columns: [],
            isLoading: false,
            isSupervisor: ls.get('isSupervisor'),
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllOrders().then(orders => {
            this.setState({
                orders: orders.data.data,
                isLoading: false,
            })
        })
    }

    handleSeed = async() => {
        this.setState({ isLoading: true })

        await api.seedDatabase()

        await api.getAllOrders().then(orders => {
            this.setState({
                orders: orders.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { orders, isLoading, isSupervisor } = this.state
        console.log('TCL: Dashboard -> render -> orders', orders)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Picked By',
                accessor: 'picked_by',
                filterable: true,
            },
            {
                Header: 'Pick Started At',
                id: 'pick_start_time',
                accessor: row => row.pick_start_time ? dayjs(row.pick_start_time).format("M/D/YY h:mm a") : "",
            },
            {
                Header: 'Pick Ended At',
                id: 'pick_end_time',
                accessor: row => row.pick_end_time ? dayjs(row.pick_end_time).format("M/D/YY h:mm a") : "",
            },
            {
                Header: 'Pack Started At',
                id: 'pack_start_time',
                accessor: row => row.pack_start_time ? dayjs(row.pack_start_time).format("M/D/YY h:mm a") : "",
            },
            {
                Header: 'Pack Ended At',
                id: 'pack_end_time',
                accessor: row => row.pack_end_time ? dayjs(row.pack_end_time).format("M/D/YY h:mm a") : "",
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    if (props.original.pick_start_time) { return( <span><DisabledLink>Pick Started</DisabledLink></span> ) }
                    else                                { return( <span><StartOrderPick id={props.original._id} /></span> ) }
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    if (props.original.pick_end_time) { return( <span><DisabledLink>Pick Stopped</DisabledLink></span> ) }
                    else                              { return( <span><StopOrderPick id={props.original._id} /></span> ) }
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    if (props.original.pack_start_time) { return( <span><DisabledLink>Pack Started</DisabledLink></span> ) }
                    else                                { return( <span><StartOrderPack id={props.original._id} /></span> ) }
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    if (props.original.pack_end_time) { return( <span><DisabledLink>Pack Stopped</DisabledLink></span> ) }
                    else                              { return( <span><StopOrderPack id={props.original._id} /></span> ) }
                },
            },
        ]

        let showTable = true
        if (!orders.length) {
            showTable = false
        }

        let seedButton
        if (isSupervisor) {
            seedButton =
                <Button variant="warning" onClick={this.handleSeed}>
                    Seed Database
                </Button>
        }
        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={orders}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
                {seedButton}
            </Wrapper>
        )
    }
}

export default Dashboard
