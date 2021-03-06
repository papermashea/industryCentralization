    ////////////////////////////////////
    ///////////// SVG Setup ////////////
    ////////////////////////////////////

const margin = {top: 20, right: 0, bottom: 30, left: 40};
const width = 1400 - margin.left - margin.right;
const height = 800 - margin.top - margin.bottom;

// var width = 1000;
// var height = 800;
// console.log(width)
// console.log(height)


var svg = d3.select("svg")
    .append('svg')
    .attr("width", width)
    .attr("height", height)
    // .attr("viewBox", `0 0 ${width} ${height}`) // responsive width & height
    .append('g')
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// console.log(g)


  d3.select("#dropdown")
        .selectAll('options')
        .data(['revenue_m', 'market_cap', 'ceo_comp', 'employee_comp'])
        .join('option')
        .text(d => d)
        .attr("value", d => d)

    d3.select("#dropdown").on("change", function (d) {
        var selectedOption = d3.select(this).property("value")
        update(selectedOption)
    })

    ////////////////////////////////////
    ///////////// Load Data ////////////
    ////////////////////////////////////

let tData = d3.csv('./data/_wip/timeline/1955-2020_sector-industry_small.csv', conversor, function(tData) {    
// let tData = d3.csv('./data/1955-2020_sector-industry.csv', conversor, function(tData) {    
// let tData = await d3.csv('./data/1955-2020_sector-industry_small.csv', conversor, function(tData) {    
// console.log(tData)

    var columns = tData.columns.slice(0);
// console.log(columns)

    var years = ['1955', '1956', '1957', '1958', '1959', '1960', '1961', '1962', '1963', '1964', '1965', '1971', '1968', '1967', '1966', '1969', '1970', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1984', '1985', '1986', '1983', '1988', '1987', '1981', '1982', '1989', '1992', '1991', '1990', '1993', '1994', '1995', '1999', '1997', '1996', '1998', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2010', '2011', '2009', '2012', '2013', '2014', '2016', '2015', '2017', '2018', '2019', '2020']
// console.log(years)

    // var ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500]
    var ranks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "197", "198", "199", "200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240", "241", "242", "243", "244", "245", "246", "247", "248", "249", "250", "251", "252", "253", "254", "255", "256", "257", "258", "259", "260", "261", "262", "263", "264", "265", "266", "267", "268", "269", "270", "271", "272", "273", "274", "275", "276", "277", "278", "279", "280", "281", "282", "283", "284", "285", "286", "287", "288", "289", "290", "291", "292", "293", "294", "295", "296", "297", "298", "299", "300", "301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313", "314", "315", "316", "317", "318", "319", "320", "321", "322", "323", "324", "325", "326", "327", "328", "329", "330", "331", "332", "333", "334", "335", "336", "337", "338", "339", "340", "341", "342", "343", "344", "345", "346", "347", "348", "349", "350", "351", "352", "353", "354", "355", "356", "357", "358", "359", "360", "361", "362", "363", "364", "365", "366", "367", "368", "369", "370", "371", "372", "373", "374", "375", "376", "377", "378", "379", "380", "381", "382", "383", "384", "385", "386", "387", "388", "389", "390", "391", "392", "393", "394", "395", "396", "397", "398", "399", "400", "401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "415", "416", "417", "418", "419", "420", "421", "422", "423", "424", "425", "426", "427", "428", "429", "430", "431", "432", "433", "434", "435", "436", "437", "438", "439", "440", "441", "442", "443", "444", "445", "446", "447", "448", "449", "450", "451", "452", "453", "454", "455", "456", "457", "458", "459", "460", "461", "462", "463", "464", "465", "466", "467", "468", "469", "470", "471", "472", "473", "474", "475", "476", "477", "478", "479", "480", "481", "482", "483", "484", "485", "486", "487", "488", "489", "490", "491", "492", "493", "494", "495", "496", "497", "498", "499", "500"]
    // console.log(ranks)


    // // min and max years
    var minYear = d3.min(tData, d => d.year);
    var maxYear = d3.max(tData, d => d.year);
    var numYears = maxYear - minYear;
    // var yearAxis = d3.axisBottom(x).ticks(numYears);
    // console.log(numYears)

    // // min and max rank inverse, lowest # is highest rank
    var maxRank = d3.min(tData, d => d.rank);
    var minRank = d3.max(tData, d => d.rank);
    // var rankAxis = d3.axisLeft(y).ticks(500);
    // console.log(minRank)

    // // min and max revenue
    var minRev = d3.min(tData, d => d.revenue_m);
    var maxRev = d3.max(tData, d => d.revenue_m);
    var totalRev = maxRev - minRev;
    // var rankAxis = d3.axisLeft(y).ticks(totalRev);
    // console.log(minRev)

    var sectors = d3.map(tData, d => d.sector)


    ////////////////////////////////////
    /////////////// Scales /////////////
    ////////////////////////////////////

    // // height scale
    // var heightScale = d3.scaleLinear().domain([0,maxRev]).range([height, 0])

    // // colors scale
    var colorScale = d3.scaleOrdinal()
        .domain(["Communication Services", "Consumer Discretionary", "Consumer Staples", "Energy", "Financials", "Health Care", "Information Technology",  "Industrials", "Materials", "Real Estate", "Utilities"])
        .range(["lightsteelblue", "cadetblue", "orchid", "thistle", "darkseagreen", "lightcoral", "cornflowerblue", "gold", "darkorange", "sandybrown", "firebrick"]);

    // // x scale
    var x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.05)
        .align(0.1)
        .domain(years);
    // console.log("x.domain(): " + x.domain())

    // // y scale
    var y = d3.scaleLinear()
        .domain([0, maxRev]).nice()
        .range([height, 0]);
    // console.log("y.domain(): " + y.domain())

    // // z scale
    var z = d3.scaleLinear()
        .domain(ranks)
        .range([1,500]);
    // console.log("z.domain(): " + z.domain())


    ////////////////////////////////////
    ////////////// Axis ////////////////
    ////////////////////////////////////

    // // x axis
    var xAxis = d3.axisBottom(x)

    svg.append("g")
        .attr("class", "axis")
        // .attr("transform", "translate(10,695)")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
          .attr("transform", "rotate(90)")
          .attr("dx", "-2em")
          .attr("dy", "-.55em")
          .style("text-anchor", "end");


    // // y axis
    var yAxis = d3.axisLeft(y);
    svg.append("g")
      .attr("class", "axis")
      .call(yAxis.ticks(10, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()))
      .attr("dy", ".9em")
      .attr("fill", "#000")
      .attr("text-anchor", "start");
    

    ////////////////////////////////////
    ////////////// Draw ////////////////
    ////////////////////////////////////

    svg.append("g")
        .selectAll("g")
        .data(d3.stack().keys(ranks)(tData))
        .enter().append("g")
          .attr("fill", function(d) { return z(d.sectors); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
          .attr("x", function(d) { return x(d.year); })
          .attr("y", function(d) { return y(d[4]); })
          .attr("height", function(d) { return y(d[5]) - y(d[4]); })
          .attr("width", x.bandwidth())
        // .on("mouseover", function() { tooltip.style("display", null); })
        // .on("mouseout", function() { tooltip.style("display", "none"); })
        // .on("mousemove", function(d) {
        //   console.log(d);
        //   var xPosition = d3.mouse(this)[0] - 5;
        //   var yPosition = d3.mouse(this)[1] - 5;
        //   tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        //   tooltip.select("text").text(d[1]-d[0]);
        });



    // stackdata = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120", "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "172", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "197", "198", "199", "200", "201", "202", "203", "204", "205", "206", "207", "208", "209", "210", "211", "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "224", "225", "226", "227", "228", "229", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240", "241", "242", "243", "244", "245", "246", "247", "248", "249", "250", "251", "252", "253", "254", "255", "256", "257", "258", "259", "260", "261", "262", "263", "264", "265", "266", "267", "268", "269", "270", "271", "272", "273", "274", "275", "276", "277", "278", "279", "280", "281", "282", "283", "284", "285", "286", "287", "288", "289", "290", "291", "292", "293", "294", "295", "296", "297", "298", "299", "300", "301", "302", "303", "304", "305", "306", "307", "308", "309", "310", "311", "312", "313", "314", "315", "316", "317", "318", "319", "320", "321", "322", "323", "324", "325", "326", "327", "328", "329", "330", "331", "332", "333", "334", "335", "336", "337", "338", "339", "340", "341", "342", "343", "344", "345", "346", "347", "348", "349", "350", "351", "352", "353", "354", "355", "356", "357", "358", "359", "360", "361", "362", "363", "364", "365", "366", "367", "368", "369", "370", "371", "372", "373", "374", "375", "376", "377", "378", "379", "380", "381", "382", "383", "384", "385", "386", "387", "388", "389", "390", "391", "392", "393", "394", "395", "396", "397", "398", "399", "400", "401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "415", "416", "417", "418", "419", "420", "421", "422", "423", "424", "425", "426", "427", "428", "429", "430", "431", "432", "433", "434", "435", "436", "437", "438", "439", "440", "441", "442", "443", "444", "445", "446", "447", "448", "449", "450", "451", "452", "453", "454", "455", "456", "457", "458", "459", "460", "461", "462", "463", "464", "465", "466", "467", "468", "469", "470", "471", "472", "473", "474", "475", "476", "477", "478", "479", "480", "481", "482", "483", "484", "485", "486", "487", "488", "489", "490", "491", "492", "493", "494", "495", "496", "497", "498", "499", "500"]
    // .map(function(c) {
    //   return tData.map(function(d,i) {
    //     return {x:i, y:d[c]} })
    //   })

    // var stack = d3.stack(tData)
    //     console.log(stackdata)    

    // var order = svg.selectAll("g")
    //     .data(stackdata)
    //     .enter()
    //     .append("g")
    //     .style("fill", function(d, i) { return ranks[i]})    

    // var chart = order.selectAll("rect")
    //     .data(function(d) {return d})
    //     .enter()
    //     .append("rect")
    //       .attr("x", function(d) { return x(d.tData.year); })
    //       .attr("y", function(d) { return y(d[1]); })
    //       .attr("height", function(d) { return y(d[0]) - y(d[1]); })
    //       .attr("width", x.bandwidth())
        // .on("mouseover", function() { tooltip.style("display", null); })
        // .on("mouseout", function() { tooltip.style("display", "none"); })
        // .on("mousemove", function(d) {
        //   console.log(d);
        //   var xPosition = d3.mouse(this)[0] - 5;
        //   var yPosition = d3.mouse(this)[1] - 5;
        //   tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        //   tooltip.select("text").text(d[1]-d[0]);
        // });
// });


    ////////////////////////////////////    
    //////////// CSV Convert ///////////
    ////////////////////////////////////


function conversor(d){
    d.revenue_m = +d.revenue_m;
    // d.rank = +d.rank;
    d.year = +d.year;
    d.profit_m = +d.profit_m;
    return d;
};
