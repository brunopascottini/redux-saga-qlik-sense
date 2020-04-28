export const updateLayout = (layout) => {
  const { qDimensionInfo: dimensionInfo, qMeasureInfo: measureInfo } = layout.qHyperCube
  const data = layout.qHyperCube.qDataPages[0].qMatrix.map((x) => ({
    qElemNumber: x[0].qElemNumber,
    dimensions: x.slice(0, dimensionInfo.length).map((d, i) => ({
      label: dimensionInfo[0].qFallbackTitle,
      value: d.qText,
    })),
    measures: x.slice(dimensionInfo.length).map((d, i) => ({
      label: measureInfo[i].qFallbackTitle,
      value: d.qNum,
    })),
  }))

  return data
}

// export const updateLayout = useCallback(
//   useCallback(
//     (layout) => {
//       return (layout) => {
//         // console.log(layout)
//         const { qDimensionInfo: dimensionInfo, qMeasureInfo: measureInfo } = layout.qHyperCube
//         // console.log('qDimensionInfo', dimensionInfo)
//         // console.log('qMeasureInfo', measureInfo)
//         const newData = layout.qHyperCube.qDataPages[0].qMatrix.map((x) => {
//           // console.log('x', x)
//           return {
//             qElemNumber: x[0].qElemNumber,
//             dimensions: x.slice(0, dimensionInfo.length).map((d, i) => {
//               // console.log('d', d)
//               return {
//                 label: dimensionInfo[0].qFallbackTitle,
//                 value: d.qText,
//               }
//             }),
//             measures: x.slice(dimensionInfo.length).map((d, i) => {
//               // console.log('d', d)
//               // console.log('i', i)
//               return {
//                 label: measureInfo[i].qFallbackTitle,
//                 value: d.qNum,
//               }
//             }),
//           }
//         })
//         setData({ chartData: newData, chartType: propChartType || layout.qInfo.qType })
//         setShowChart(true)

//         return layout
//       })
//     },
//     [getObjectLayout, propChartType]
//   )
