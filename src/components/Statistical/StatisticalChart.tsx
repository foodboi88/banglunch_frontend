import React, { useEffect, useState } from 'react'
import { Chart, ChartAxis, ChartGroup, ChartLine, ChartThemeColor, ChartVoronoiContainer } from '@patternfly/react-charts';
import { useSelectorRoot } from '../../redux/store';
import TotalBoxUser from '../TotalBox/TotalBoxUser';

interface StatisticalChartProps {
    data: any
}
const nameTitleChart = [
    { name: 'Tổng doanh thu' },
    // {name: 'Tiền thu từ khách'},
    // {name: 'Tiền thu từ chủ sở hữu'},
    // {name: 'Tiền thu từ người bán'},
]
const StatisticalChart = (props: StatisticalChartProps) => {

    const { typeViewStatistic } = useSelectorRoot((state) => state.sketch); // lấy ra state từ store

    const [dataChart, setDataChart] = useState<any>([]); // state của component
    const [maxValue, setMaxValue] = useState<number>(0); // state của component
    const [totalPriceLst, setTotalPriceLst] = useState<any[]>([]); // state của component
    const [totalPriceIncomeLst, setTotalPriceIncomeLst] = useState<any[]>([]); // state của component
    const [totalPriceOwnLst, setTotalPriceOwnLst] = useState<any[]>([]); // state của component
    const [totalPriceSellerLst, setTotalPriceSellerLst] = useState<any[]>([]); // state của component
    const [totalSellLst, setTotalSellLst] = useState<any[]>([]); // state của component
    useEffect(() => {
        if (props.data && props.data.items) {
            console.log(props.data);
            setDataChart(props.data.items)

            // const maxTotalPrice = Math.max(...props.data.items.map((item: { totalPrice: any; }) => item.totalPrice));
            // const maxTotalPriceIncome = Math.max(...props.data.items.map((item: { totalPriceIncome: any; }) => item.totalPriceIncome));
            // const maxTotalPriceOwn = Math.max(...props.data.items.map((item: { totalPriceOwn: any; }) => item.totalPriceOwn));
            // const maxTotalPriceSeller = Math.max(...props.data.items.map((item: { totalPriceSeller: any; }) => item.totalPriceSeller));

            // const max = Math.max(maxTotalPrice, maxTotalPriceIncome, maxTotalPriceOwn, maxTotalPriceSeller);
            // setMaxValue(max);

            // getValueTotalPrice(props.data.items);
            // getValueTotalPriceIncome(props.data.items);
            // getValueTotalPriceOwn(props.data.items);
            // getValueTotalPriceSeller(props.data.items);

            const maxTotalSell = Math.max(...props.data.items.map((item: { totalSell: any; }) => item.totalSell));
            const max = Math.max(maxTotalSell);
            setMaxValue(max);

            getValueTotalSell(props.data.items);
        }

    }, [props.data])

    const getValueTotalSell = (items: []) => {
        const tmpLst: any[] = []
        if (typeViewStatistic === 'day') {
            items.map((item: any) => {
                const time = new Date(item.day).toLocaleDateString('en-GB');
                const tmp = {
                    name: 'Tổng danh thu',
                    x: time,
                    y: item.totalSell
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'month') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Tổng danh thu',
                    x: `${item.month}/${item.year}`,
                    y: item.totalSell
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'quarter') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Tổng danh thu',
                    x: `Quý ${item.quarter}/${item.year}`,
                    y: item.totalSell
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'year') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Tổng danh thu',
                    x: `${item.year}`,
                    y: item.totalSell
                }
                tmpLst.push(tmp)
            })
        }
        setTotalSellLst(tmpLst);

    }


    const getValueTotalPrice = (items: []) => {
        const tmpLst: any[] = []
        if (typeViewStatistic === 'day') {
            items.map((item: any) => {
                const time = new Date(item.day).toLocaleDateString('en-GB');
                const tmp = {
                    name: 'Tiền thu từ khách',
                    x: time,
                    y: item.totalPrice
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'month') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Tiền thu từ khách',
                    x: `${item.month}/${item.year}`,
                    y: item.totalPrice
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'quarter') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Tiền thu từ khách',
                    x: `Quý ${item.quarter}/${item.year}`,
                    y: item.totalPrice
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'year') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Tiền thu từ khách',
                    x: `${item.year}`,
                    y: item.totalPrice
                }
                tmpLst.push(tmp)
            })
        }
        setTotalPriceLst(tmpLst);
    }

    const getValueTotalPriceIncome = (items: []) => {
        const tmpLst: any[] = []
        if (typeViewStatistic === 'day') {
            items.map((item: any) => {
                const time = new Date(item.day).toLocaleDateString('en-GB');
                const tmp = {
                    name: 'Tiền trả người bán',
                    x: time,
                    y: item.totalPriceIncome
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'month') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Tiền trả người bán',
                    x: `${item.month}/${item.year}`,
                    y: item.totalPriceIncome
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'quarter') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Tiền trả người bán',
                    x: `Quý ${item.quarter}/${item.year}`,
                    y: item.totalPriceIncome
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'year') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Tiền trả người bán',
                    x: `${item.year}`,
                    y: item.totalPriceIncome
                }
                tmpLst.push(tmp)
            })
        }
        setTotalPriceIncomeLst(tmpLst);
    }

    const getValueTotalPriceOwn = (items: []) => {
        const tmpLst: any[] = []
        if (typeViewStatistic === 'day') {
            items.map((item: any) => {
                const time = new Date(item.day).toLocaleDateString('en-GB');
                const tmp = {
                    name: 'Tiền còn nợ',
                    x: time,
                    y: item.totalPriceOwn
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'month') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Tiền còn nợ',
                    x: `${item.month}/${item.year}`,
                    y: item.totalPriceOwn
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'quarter') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Tiền còn nợ',
                    x: `Quý ${item.quarter}/${item.year}`,
                    y: item.totalPriceOwn
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'year') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Tiền còn nợ',
                    x: `${item.year}`,
                    y: item.totalPriceOwn
                }
                tmpLst.push(tmp)
            })
        }
        setTotalPriceOwnLst(tmpLst);
    }

    const getValueTotalPriceSeller = (items: []) => {
        const tmpLst: any[] = []
        if (typeViewStatistic === 'day') {
            items.map((item: any) => {
                const time = new Date(item.day).toLocaleDateString('en-GB');
                const tmp = {
                    name: 'Hoa hồng',
                    x: time,
                    y: item.totalPriceSeller
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'month') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Hoa hồng',
                    x: `${item.month}/${item.year}`,
                    y: item.totalPriceSeller
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'quarter') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Hoa hồng',
                    x: `Quý ${item.quarter}/${item.year}`,
                    y: item.totalPriceSeller
                }
                tmpLst.push(tmp)
            })
        }
        if (typeViewStatistic === 'year') {
            items.map((item: any) => {
                const tmp = {
                    name: 'Hoa hồng',
                    x: `${item.year}`,
                    y: item.totalPriceSeller
                }
                tmpLst.push(tmp)
            })
        }
        setTotalPriceSellerLst(tmpLst);
    }

    const divideRangeIntoFourParts = (maxValue: number) => {

        const interval = maxValue / 8;
        const divisions = [];
        for (let i = 1; i <= 8; i++) {
            let tmp = Math.round(interval * i);

            divisions.push(tmp);
        }

        return divisions;
    }
    return (
        <>
            {/* {(dataChart && dataChart.length > 0 && maxValue > 0) && */}
            <div className='main-statistical-chart'>
                {dataChart.length > 0 &&
                    <div className='total-content'>
                        <TotalBoxUser
                            title='Tổng tiền bán'
                            number={props.data.totalSellSum}
                            icon=''
                        />
                        {/* <TotalBoxUser
                                title='Tiền trả người bán'
                                number={props.data.totalPriceSum}
                                icon=''
                            />
                            <TotalBoxUser
                                title='Tiền còn nợ'
                                number={props.data.totalPriceSum}
                                icon=''
                            />
                            <TotalBoxUser
                                title='Tiền hoa hồng'
                                number={props.data.totalPriceSum}
                                icon=''
                            /> */}
                    </div>
                }

                <Chart
                    ariaDesc="Average number of pets"
                    ariaTitle="Line chart example"
                    containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}: ${datum.y}`} constrainToVisibleArea />}
                    legendData={
                        nameTitleChart
                    }
                    legendOrientation="vertical"
                    legendPosition="right"
                    height={270}
                    maxDomain={{ y: maxValue }}
                    minDomain={{ y: 0 }}
                    name="chart1"
                    padding={{
                        bottom: 50,
                        left: 50,
                        right: 200, // Adjusted to accommodate legend
                        top: 50
                    }}
                    width={600}
                    themeColor={ChartThemeColor.multiUnordered}

                >
                    <ChartAxis tickValues={divideRangeIntoFourParts(maxValue)} />
                    <ChartAxis dependentAxis showGrid tickValues={divideRangeIntoFourParts(maxValue)} />
                    <ChartGroup>
                        <ChartLine
                            data={totalSellLst}
                        />
                        {/* <ChartLine
                                data={totalPriceIncomeLst}
                            />
                            <ChartLine
                                data={totalPriceOwnLst}
                            />
                            <ChartLine
                                data={totalPriceSellerLst}
                            /> */}
                    </ChartGroup>
                </Chart>
            </div>

            {/* } */}
        </>
    )
}

export default StatisticalChart