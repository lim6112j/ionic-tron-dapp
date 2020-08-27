import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Platform } from '@ionic/angular';
import * as d3 from 'd3';
import * as fc from 'd3fc';

// const loadDataEndOfDay = d3.csv(url, d => ({
//   date: new Date(d.Timestamp * 1000),
//   volume: Number(d.volume),
//   high: Number(d.high),
//   low: Number(d.low),
//   open: Number(d.open),
//   close: Number(d.close)
// }));
@Component({
  selector: 'app-gold',
  templateUrl: './gold.page.html',
  styleUrls: ['./gold.page.scss'],
})
export class GoldPage implements OnInit{
  headerImage = '../../../assets/gold.png';
  barData = [
    { season: 'S1', viewers: 2500000 },
    { season: 'S2', viewers: 3800000 },
    { season: 'S3', viewers: 5000000 },
    { season: 'S4', viewers: 6900000 },
    { season: 'S5', viewers: 6900000 },
    { season: 'S6', viewers: 7500000 },
    { season: 'S7', viewers: 10000000 },
    { season: 'S8', viewers: 17000000 }
  ];
  title = 'Game of Thrones';
  subtitle = 'Viewers per season for';
  width: number;
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;
  constructor(
    private _platform: Platform,
    private _http: HttpClient
  ) {
    // this.width = this._platform.width() - this.margin.left - this.margin.right;
    this.width = this._platform.width();
    this.height = this._platform.height() - this.margin.top - this.margin.bottom;
  }
  ngOnInit(): void {
    this._http.get('assets/gold.csv', { responseType: 'text' }).subscribe(v => {
      var objs = d3.csvParse(v);
      console.log(objs);
      const data = objs.map(d => ({
        date: d.Date.split(",")[0],
        high: Number(d.High.split(",").join("")),
        low: Number(d.Low.split(",").join("")),
        open: Number(d.Open.split(",").join("")),
        close: Number(d.Price.split(",").join("")),
        change: Number(d.Change.split("%")[0])
      }))
      // console.log(data)
      // const data = objs.map(d => ({
      //   date: new Date((d.Timestamp as any) * 1000),
      //   volume: Number(d.volume),
      //   high: Number(d.high),
      //   low: Number(d.low),
      //   open: Number(d.open),
      //   close: Number(d.close)
      // }));
      // console.log(data);

      // this.createChart(data);
      this.createChart2(data);
    });
    // this._http.get('assets/gold.json', { responseType: 'json'}).subscribe((v:any) => {
    //   const chartData = v.chart.result[0];
    //   const quoteData = chartData.indicators.quote[0];
    //   const result = chartData.timestamp.map((d, i) => ({
    //     date: new Date(d * 1000 - 5 * 1000 * 60 * 60),
    //     high: quoteData.high[i],
    //     low: quoteData.low[i],
    //     open: quoteData.open[i],
    //     close: quoteData.close[i],
    //     volume: quoteData.volume[i]
    //   }));
    //   this.createChart(result.slice(0, 500));
    // });
  }

  ionViewDidEnter() {

  }
  createChart2(data) {
    const margin = this.margin,
    width = this.width - margin.left - margin.right,
    height = this.height/2 - margin.top - margin.bottom;
    data = data.reverse();
        // append the svg object to the body of the page
    var svg = d3.select("#complex-chart")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    const sumstat:any = d3.nest()
      .key(function(d: any) {return d.date})
      .rollup(function(d: any):any{
        console.log(d)
        const high = d[0].high;
        const low = d[0].low;
        const open = d[0].open;
        const close = d[0].close;
        const top = open > close ? open : close;
        const bottom = open < close ? open : close;
        return {high, low, open, close, top, bottom};
      })
      .entries(data);
      // console.log(sumstat)
          // Show the X scale
      var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(sumstat.map(d => d.key))
      .paddingInner(1)
      .paddingOuter(.5)
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))

    // Show the Y scale
    var y = d3.scaleLinear()
      .domain([1800, 2150])
      .range([height, 0])
    svg.append("g").call(d3.axisLeft(y))
    // Show the main vertical line
    svg
      .selectAll("vertLines")
      .data(sumstat)
      .enter()
      .append("line")
      //   .attr("aaa", function(d) {
      //       console.log(d.value.low);
      //   })
        .attr("x1", function(d:any){return(x(d.key))})
        .attr("x2", function(d:any){return(x(d.key))})
        .attr("y1", function(d:any){return y(d.value.low)})
        .attr("y2", function(d:any){return y(d.value.high)})
        .attr("stroke", "black")
        .style("width", 40)
// rectangle for the main box
var boxWidth = 10
svg
  .selectAll("boxes")
  .data(sumstat)
  .enter()
  .append("rect")
      .attr("x", function(d:any){return(x(d.key)-boxWidth/2)})
      .attr("y", function(d:any){return(y(d.value.top))})
      .attr("height", function(d:any){return(y(d.value.bottom)-y(d.value.top))})
      .attr("width", boxWidth )
      .attr("stroke", "black")
      .style("fill", (d:any) => d.value.open == d.value.bottom ? "#b90a0a" : "#16aa2e")
svg.on("mousemove", function() { // lamda function make trouble , why??? consult this binding !!
  const mouse = d3.mouse(this);
  const mousex = mouse[0];
  const mousey = mouse[1];
  // console.log(mousex);
  // console.log(sumstat)
  // console.log(typeof x("Jul 28"));
  let result = sumstat.reduce((acc, curr, i) => {
    // console.log("mousex : ", mousex, " x(curr.key) : ", x(curr.key));
    // console.log("diff : ", Math.abs(mousex - x(curr.key)), " acc.diff : ", acc.diff)
    // console.log("curr : ", curr)
    let diff = Math.abs(mousex - x(curr.key));
    acc.diff = acc.diff > diff ? diff : acc.diff;
    acc.val = acc.diff === diff ? curr.key : acc.val; // acc.diff already changed above line, so === should be used
    acc.idx = acc.diff === diff ? i : acc.idx;
    // console.log("acc : ", acc);
    return acc;
  }, {val: '', diff: 1000, idx: 0})
  // console.log((sumstat[result.idx]).key);
  const foundData = sumstat[result.idx];
  const legendData = [
    {key: 'Date', value: result.val},
    {key: 'high', value: foundData.value.high},
    {key: 'low', value: foundData.value.low},
    {key: 'open', value: foundData.value.open},
    {key: 'close', value: foundData.value.close}
  ];

  svg.selectAll('#gText').remove();
  const gText = svg.append("g")
  .attr("transform", "translate(" + (10) + ",0)")
  .attr("id", "gText");
  gText.selectAll('legend')
  .data(legendData)
  .enter()
  .append('text')
  .attr("id", "legend")
  .attr('x', 0)
  .attr('y', (d, i) => i*20)
  .text(d => d.key+ " : " + d.value);
}).on("mouseout", function() {
  console.log('mouse out !!!');});
  }
  createChart(data) {
    const xExtent = fc.extentDate()
      .accessors([d => d.date]);
    const yExtent = fc.extentLinear()
      .pad([0.1, 0.1])
      .accessors([d => d.high, d => d.low]);

    const lineSeries = fc
      .seriesSvgLine()
      .mainValue(d => d.high)
      .crossValue(d => d.date);
    const areaSeries = fc
      .seriesSvgArea()
      .baseValue(d => yExtent(data)[0])
      .mainValue(d => d.high)
      .crossValue(d => d.date);
    const gridlines = fc
      .annotationSvgGridline()
      .yTicks(5)
      .xTicks(0);
    // average
    const ma = fc
      .indicatorMovingAverage()
      .value(d => d.high)
      .period(15);

    const maData = ma(data);
    data = data.map((d, i) => ({ ma: maData[i], ...d }));
    const movingAverageSeries = fc
    .seriesSvgLine()
    .mainValue(d => d.ma)
    .crossValue(d => d.date)
    .decorate(sel =>
      sel.enter()
        .classed("ma", true)
    );
    // volumn
    const volumeExtent = fc
      .extentLinear()
      .include([0])
      .pad([0, 2])
      .accessors([d => d.volume]);
    const volumeDomain = volumeExtent(data);
    const volumeToPriceScale = d3
    .scaleLinear()
    .domain(volumeDomain)
    .range(yExtent(data));
    const volumeSeries = fc
    .seriesSvgBar()
    .bandwidth(2)
    .crossValue(d => d.date)
    .mainValue(d => volumeToPriceScale(d.volume))
    .decorate(sel =>
      sel
        .enter()
        .classed("volume", true)
        .attr("fill", d => (d.open > d.close ? "red" : "green"))
    );
        // trading hours - discontinuous time x axis
        const tradingHours = dates => {
          const getDateKey = date =>
            date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear();
        
          const tradingHours = dates.reduce((acc, curr) => {
            const dateKey = getDateKey(curr);
            if (!acc.hasOwnProperty(dateKey)) {
              acc[dateKey] = [curr, curr];
            } else {
              acc[dateKey][1] = curr;
            }
            return acc;
          }, {});
        
          return Object.keys(tradingHours).map(d => tradingHours[d]);
        };
        const xScale = fc.scaleDiscontinuous(d3.scaleTime());
        const tradingHoursArray = tradingHours(data.map(d => d.date));
        const discontinuities = d3
          .pairs(tradingHoursArray)
          .map(d => [d[0][1], d[1][0]]);
        xScale.discontinuityProvider(fc.discontinuityRange(...discontinuities));
        const yScale = d3.scaleLinear();
    // crosshair
    const crosshair = fc
    .annotationSvgCrosshair()
    .x(d => xScale(d.date))
    .y(d => yScale);
    // multi view
    const multi = fc.seriesSvgMulti()
      .series([gridlines, areaSeries, lineSeries, movingAverageSeries, volumeSeries])
      .mapping((data, index, series) => {
        if (data.loading) {
          return [];
        }
        switch (series[index]) {
          case chartLegend:
            const lastPoint = data[data.length - 1];
            const legendValue = data.crosshair.length
              ? data.crosshair[0]
              : lastPoint;
            return legendData(legendValue);
          case crosshair:
            return data.crosshair;
          // case verticalAnnotation:
          //   return flatten(data.tradingHoursArray.map(markersForDay));
          // case bands:
          //   return d3.pairs(
          //     data.tradingHoursArray.map(d => exchangeOpeningHours(d[0]))
          //   );
          default:
            return data;
        }
      });;
    // legend
    const legend = () => {
      const labelJoin = fc.dataJoin("text", "legend-label");
      const valueJoin = fc.dataJoin("text", "legend-value");
    
      const instance = selection => {
        selection.each((data, selectionIndex, nodes) => {
          labelJoin(d3.select(nodes[selectionIndex]), data)
            .attr("transform", (_, i) => "translate(130, " + (i + 1) * 15 + ")")
            .text(d => d.name);
    
          valueJoin(d3.select(nodes[selectionIndex]), data)
            .attr("transform", (_, i) => "translate(190, " + (i + 1) * 15 + ")")
            .text(d => d.value);
        });
      };
    
      return instance;
    };
    const dateFormat = d3.timeFormat("%a %H:%M%p");
    const priceFormat = d3.format(",.2f");
    const legendData = datum => [
      { name: "Open", value: priceFormat(datum.open) },
      { name: "High", value: priceFormat(datum.high) },
      { name: "Low", value: priceFormat(datum.low) },
      { name: "Close", value: priceFormat(datum.close) },
      { name: "Volume", value: priceFormat(datum.volume) }
    ];
    const chartLegend = legend();

    // chart main
    const chart = fc
      .chartCartesian(xScale, yScale)
      .yOrient("right")
      .yDomain(yExtent(data))
      .xDomain(xExtent(data))
      .svgPlotArea(multi)
      .decorate(sel => {
        sel
          .datum(legendData(data[data.length - 1]))
          .append("svg")
          .style("grid-column", 3)
          .style("grid-row", 3)
          .classed("legend", true)
          .call(chartLegend);
      });

    // d3.select("#complex-chart")
    //   .datum(data)
    //   .call(chart);

    // for crosshair
    const chartData: any = []
    const render = () => {
      d3.select("#complex-chart")
        .datum(data)
        .call(chart);
    
      const pointer = fc.pointer().on("point", event => {
        chartData.crosshair = event.map(({x}) => {
          const closestIndex = d3.bisector((d:any) => d.date)
            .left(data, xScale.invert(x));
          return data[closestIndex];
        });
        console.log(chartData.crosshair)
        render();
      });
    
      d3.select("#complex-chart .plot-area").call(pointer);
    };
    
    render();
    }
}
