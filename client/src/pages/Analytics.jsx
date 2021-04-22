import React, { Component } from 'react'
import api from '../api'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Label = styled.label`
    margin: 5px;
`

class Analytics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            analytics: [],
            isLoading: true,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAnalytics().then(analytics => {
            this.setState({
                analytics: analytics.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { analytics, isLoading } = this.state
        console.log('TCL: Analytics -> render -> analytics', analytics)

        let showAnalytics = true
        if (isLoading || !Object.keys(analytics.analytics).length) {
            showAnalytics = false
        }

        let data = {}
        if (showAnalytics) {
            Object.keys(analytics.analytics).forEach((a) => {
                const userAnalytics = analytics.analytics[a]
                data[a] = []
                userAnalytics.forEach((weekAnalytics) => {
                    data[a].push(
                        {
                            name: `Week ${weekAnalytics["_id"]}`,
                            pick: weekAnalytics["averagePickTime"] / 1000,
                            pack: weekAnalytics["averagePackTime"] / 1000,
                        }
                    )
                })
            })
        }

        return(
            Object.keys(data).map((d,i) => {
                return(
                    <Wrapper key={`employee_${i}_chart`}>
                        <Label>Employee: {d}</Label>
                        <LineChart
                            width={500}
                            height={300}
                            data={data[d]}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="pick" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="pack" stroke="#82ca9d" />
                        </LineChart>
                    </Wrapper>
                )
            })
        )
    }
}

export default Analytics
