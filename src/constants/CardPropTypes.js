import PropTypes from 'prop-types';
import {
  blue80,
  cyan50,
  green60,
  magenta50,
  magenta70,
  purple70,
  red50,
  red90,
  teal50,
  teal70,
  cyan90,
  purple50,
} from '@carbon/colors';

import deprecate from '../internal/deprecate';
import { bundledIconNames } from '../utils/bundledIcons';

import {
  CARD_LAYOUTS,
  DASHBOARD_SIZES,
  CARD_SIZES,
  LEGACY_CARD_SIZES,
  CARD_DATA_STATE,
  BAR_CHART_TYPES,
  BAR_CHART_LAYOUTS,
} from './LayoutConstants';
import { OverridePropTypes } from './SharedPropTypes';

export const CHART_COLORS = [
  purple70,
  cyan50,
  teal70,
  magenta70,
  red50,
  red90,
  green60,
  blue80,
  magenta50,
  teal50,
  cyan90,
  purple50,
];

export const AttributePropTypes = PropTypes.shape({
  label: PropTypes.string, // optional for little cards
  /** the key to load the value from the values object */
  dataSourceId: PropTypes.string.isRequired,
  /** optional data filter to apply to each attribute */
  dataFilter: PropTypes.objectOf(PropTypes.any),
  secondaryValue: PropTypes.shape({
    /** the key to load the value from the values object */
    dataSourceId: PropTypes.string.isRequired,
    color: PropTypes.string,
    trend: PropTypes.oneOf(['up', 'down']),
  }),
  thresholds: PropTypes.arrayOf(
    PropTypes.shape({
      comparison: PropTypes.oneOf(['<', '>', '=', '<=', '>=']).isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      color: PropTypes.string,
      icon: PropTypes.string,
    })
  ),
  unit: PropTypes.string,
});

export const RowHeightPropTypes = PropTypes.shape({
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
  xs: PropTypes.number,
});

export const DashboardBreakpointsPropTypes = PropTypes.shape({
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
  xs: PropTypes.number,
});

export const DashboardColumnsPropTypes = PropTypes.shape({
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
  xs: PropTypes.number,
});

export const ValueCardPropTypes = {
  content: PropTypes.shape({
    attributes: PropTypes.arrayOf(AttributePropTypes).isRequired,
  }),
  /** Value card expects its values passed as an object with key value pairs */
  values: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  /** DataState will override the cards default empty state and error string */
  dataState: PropTypes.shape({
    type: PropTypes.oneOf([CARD_DATA_STATE.NO_DATA, CARD_DATA_STATE.ERROR])
      .isRequired,
    icon: PropTypes.element,
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    extraTooltipText: PropTypes.string,
    learnMoreElement: PropTypes.element,
    tooltipDirection: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
  }),
  cardVariables: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.number,
      PropTypes.bool,
    ])
  ),
  /**
   * Value Card's formatting can be updated at runtime, customFormatter is provided the default formatted value and
   * the original value and expects a value to be returned that will be rendered on the value card.
   */
  customFormatter: PropTypes.func,
};

export const TableCardPropTypes = {
  tooltip: PropTypes.node,
  title: PropTypes.string,
  size: PropTypes.oneOf([CARD_SIZES.LARGE, CARD_SIZES.LARGEWIDE]),
  content: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        dataSourceId: PropTypes.string.isRequired,
        /** optional width in pixels, default is no enforced max width */
        width: PropTypes.number,
        label: PropTypes.string,
        priority: PropTypes.number,
        /** See the renderDataFunction for TablePropTypes */
        renderDataFunction: PropTypes.func,
        type: PropTypes.string,
      })
    ).isRequired,
    showHeader: PropTypes.bool,
    expandedRows: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string,
      })
    ),
    thresholds: PropTypes.arrayOf(
      PropTypes.shape({
        dataSourceId: PropTypes.string.isRequired,
        comparison: PropTypes.oneOf(['<', '>', '=', '<=', '>=']).isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        severity: PropTypes.oneOf([1, 2, 3]),
        /** optional overrides for color and icon */
        color: PropTypes.string,
        /** Custom threshold icon name */
        icon: PropTypes.string,
        /** Custom threshold label text */
        label: PropTypes.string,
        /** Optionally shows threshold severity label text. Shows by default */
        showSeverityLabel: PropTypes.bool,
        /** Optionally changes threshold severity label text */
        severityLabel: PropTypes.string,
        /** Shows column when there is no data */
        showOnContent: PropTypes.bool,
      })
    ),
    sort: PropTypes.oneOf(['ASC', 'DESC']),
    emptyMessage: PropTypes.node,
  }).isRequired,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      values: PropTypes.object.isRequired,
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string,
          icon: PropTypes.oneOfType([
            PropTypes.oneOf(bundledIconNames),
            PropTypes.shape({
              width: PropTypes.string,
              height: PropTypes.string,
              viewBox: PropTypes.string.isRequired,
              svgData: PropTypes.object.isRequired,
            }),
          ]),
        })
      ),
    })
  ),
  i18n: PropTypes.shape({
    criticalLabel: PropTypes.string,
    moderateLabel: PropTypes.string,
    lowLabel: PropTypes.string,
    selectSeverityPlaceholder: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    filterButtonAria: PropTypes.string,
    defaultFilterStringPlaceholdText: PropTypes.string,
    downloadIconDescription: PropTypes.string,
  }),
  cardVariables: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.number,
      PropTypes.bool,
    ])
  ),
};

/** Optionally addes a zoom bar to the chart */
export const ZoomBarPropTypes = PropTypes.shape({
  /** Determines which axis to put the zoomBar */
  axes: PropTypes.oneOf(['top']), // top is the only axes supported right now
  // axes: PropTypes.oneOf(['top', 'bottom', 'left', 'right']), // TODO: When the other axes are supported, swap to this proptype
  /** Determines whether the zoomBar is enabled */
  enabled: PropTypes.bool,
  /** Optional domain to zoom to by default. Can be a timestamp or date string */
  initialZoomDomain: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  /** How the zoomBar will display. Graph view shows a graphical interpretation of the chart data.
   * Slider view is a simple slider with no graphical interpretation */
  view: PropTypes.oneOf(['graph_view', 'slider_view']),
});

/** This dataset only supports one data attribute at a time */
const BarChartDatasetPropType = {
  /** data attribute that will be displayed as bar height y-axis value */
  dataSourceId: PropTypes.string.isRequired,
  /** optional label of the bar in the legend */
  label: PropTypes.string,
  /** optional each attribute has a different color, or use an object to set a color by category value,
   * or an array if you don't care which category values maps to a particular color. NOTE: If using the
   * object option, the key must match the dataset label name */
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export const BarChartCardPropTypes = {
  /** card size */
  size: (props, propName, componentName) => {
    let error;
    if (!Object.keys(CARD_SIZES).includes(props[propName])) {
      error = new Error(
        `\`${componentName}\` prop \`${propName}\` must be one of ${Object.keys(
          CARD_SIZES
        ).join(',')}.`
      );
    }
    // If the size
    if (
      props[propName] === CARD_SIZES.SMALL ||
      props[propName] === CARD_SIZES.SMALLWIDE
    ) {
      error = new Error(
        `Deprecation notice: \`${componentName}\` prop \`${propName}\` cannot be \`SMALL\` || \`SMALLWIDE\` as the charts will not render correctly. Minimum size is \`MEDIUM\``
      );
    }
    return error;
  },
  content: PropTypes.shape({
    /** the layout of the bar chart (horizontal, vertical) */
    layout: PropTypes.oneOf(Object.values(BAR_CHART_LAYOUTS)),
    /** the type of bar chart (simple, grouped, stacked) */
    type: (props, propName, componentName) => {
      let error;
      // Must be one of the BAR_CHART_TYPES
      if (!Object.values(BAR_CHART_TYPES).includes(props[propName])) {
        error = new Error(
          `\`${componentName}\` prop \`${propName}\` must be \`SIMPLE\`, \`GROUPED\`, or \`STACKED\`.`
        );
      } // GROUPED charts can't have timeDataSourceId
      else if (
        props[propName] === BAR_CHART_TYPES.GROUPED &&
        props.timeDataSourceId
      ) {
        error = new Error(
          `\`BarChartCard\` of type \`GROUPED\` cannot use \`timeDataSourceId\` at this time.`
        );
      } // STACKED charts with timeDataSourceId and categoryDataSourceId can't have datasource labels
      else if (
        props[propName] === BAR_CHART_TYPES.STACKED &&
        props.timeDataSourceId &&
        props.categoryDataSourceId
      ) {
        let hasDataSourceLabel = false;
        props.series.forEach((datasource) => {
          if (datasource.label) {
            hasDataSourceLabel = true;
          }
        });
        if (hasDataSourceLabel) {
          error = new Error(
            `\`BarChartCard\` of type \`STACKED\` with \`categoryDataSourceId\` AND \`timeDataSourceId\` cannot use \`label\` within series. The legend labels will be created from the \`categoryDataSourceId\`.`
          );
        }
      }
      return error;
    },
    /** x-axis display name */
    xLabel: PropTypes.string,
    /** y-axis display name */
    yLabel: PropTypes.string,
    /** defined dataset attributes */
    series: PropTypes.arrayOf(PropTypes.shape(BarChartDatasetPropType))
      .isRequired,
    /** for category type bar charts this is the x-axis value */
    categoryDataSourceId: (props, propName, componentName) => {
      let error;
      if (
        props[propName] &&
        props.type === BAR_CHART_TYPES.SIMPLE &&
        props.timeDataSourceId
      ) {
        error = new Error(
          `\`${componentName}\` of type \`SIMPLE\` can not have \`${propName}\` AND \`timeDataSourceId\`.`
        );
      } // all charts must have oneOf[categoryDataSourceId, timeDataSourceId]
      else if (!props[propName] && !props.timeDataSourceId) {
        error = new Error(
          `\`${componentName}\` must have \`${props[propName]}\` OR \`timeDataSourceId\`.`
        );
      }
      return error;
    },
    /** for time based bar charts this is the x-axis value */
    timeDataSourceId: (props, propName, componentName) => {
      let error;
      if (
        props[propName] &&
        props.type === BAR_CHART_TYPES.SIMPLE &&
        props.categoryDataSourceId
      ) {
        error = new Error(
          `\`${componentName}\` of type \`SIMPLE\` can not have \`${propName}\` AND \`categoryDataSourceId\`.`
        );
      }
      return error;
    },
    /** optional units to put in the legend for all datasets */
    unit: PropTypes.string,
    /** Optionally addes a zoom bar to the chart */
    zoomBar: ZoomBarPropTypes,
  }).isRequired,
  /** array of data from the backend for instance [{quarter: '2020-Q1', city: 'Amsterdam', particles: 44700}, ...] */
  values: PropTypes.arrayOf(PropTypes.object),
  /** internationalization */
  i18n: PropTypes.shape({
    alertDetected: PropTypes.string,
  }),
  /** optional domain to graph from. First value is the beginning of the range. Second value is the end of the range
   * can be date instance or timestamp */
  domainRange: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.object])
  ),
  /** Show timestamp in browser local time or GMT */
  showTimeInGMT: PropTypes.bool,
  /** tooltip format pattern that follows the moment formatting patterns */
  tooltipDateFormatPattern: PropTypes.string,
};

export const PieCardPropTypes = {
  /** Configuration content for the PieChart */
  content: PropTypes.shape({
    /** Object that maps the groupDataSourceId with a specific color, e.g. {'Group A': 'red', 'Group B': 'blue', ... } */
    colors: PropTypes.object,
    /** Function to output custom HTML for the tooltip. Passed an array or object with the data,
     * and the default tooltip markup */
    customTooltip: PropTypes.func,
    /** Defaults to 'group' but can be overriden to be any string property of the objects in the values array */
    groupDataSourceId: PropTypes.string,
    /**
     * Function to format the labels. Input to the function is a wrapped data object containing additional
     * chart label info such as x & y positions etc */
    labelsFormatter: PropTypes.func,
    /** The position of the legend in relation to the chart, can be 'bottom' or 'top'. */
    legendPosition: PropTypes.string,
  }),
  /** Used to overide the internal components and props for advanced customisation */
  overrides: PropTypes.shape({
    card: OverridePropTypes,
    pieChart: OverridePropTypes,
    table: OverridePropTypes,
  }),
  testID: PropTypes.string,
  /**
   * array of data objects from the backend for instance [{group: 'Group A', value: 50}, {group: 'Group B', value: 50}, ...]
   * The group property can be called anything since it can be mapped via the groupDataSourceId but there must at least
   * be one property called value of type number. */
  values: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        /** the name of the slice */
        group: PropTypes.string.isRequired,
        /** the value of the slice */
        value: PropTypes.number.isRequired,
      }),
      PropTypes.object,
    ])
  ),
};

export const DonutCardPropTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        color: PropTypes.string,
      })
    ),
  }).isRequired,
};

export const ImageCardPropTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.object,
  }).isRequired,
  values: PropTypes.shape({
    hotspots: PropTypes.array,
  }),
};

export const GaugeCardPropTypes = {
  tooltip: PropTypes.element,
  content: PropTypes.shape({
    gauges: PropTypes.arrayOf(
      PropTypes.shape({
        dataSourceId: PropTypes.string,
        units: PropTypes.string,
        minimumValue: PropTypes.number,
        maximumValue: PropTypes.number,
        renderValueFunction: PropTypes.func,
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
        shape: PropTypes.oneOf(['half-circle', 'line', 'circle']),
        trend: PropTypes.shape({
          /** the key to load the trend value from the values object. */
          dataSourceId: PropTypes.string,
          color: PropTypes.string,
          trend: PropTypes.oneOf(['up', 'down']),
        }),
        thresholds: PropTypes.arrayOf(
          PropTypes.shape({
            comparison: PropTypes.oneOf(['<', '>', '=', '<=', '>=']),
            value: PropTypes.number,
            color: PropTypes.string,
            label: PropTypes.string,
          })
        ),
      })
    ),
  }),
  values: PropTypes.shape({
    temperature: PropTypes.number,
    temperatureTrend: PropTypes.number,
  }),
};

export const DashboardLayoutPropTypes = PropTypes.shape({
  i: PropTypes.any,
  x: PropTypes.number,
  y: PropTypes.number,
  w: PropTypes.number,
  h: PropTypes.number,
});

export const CardDimensionPropTypes = PropTypes.shape({
  w: PropTypes.number,
  h: PropTypes.number,
});

export const CardDimensionsPropTypes = PropTypes.shape({
  lg: CardDimensionPropTypes,
  md: CardDimensionPropTypes,
  sm: CardDimensionPropTypes,
  xs: CardDimensionPropTypes,
});

export const CardSizesToDimensionsPropTypes = PropTypes.shape({
  XSMALL: CardDimensionsPropTypes,
  SMALL: CardDimensionsPropTypes,
  TALL: CardDimensionsPropTypes,
  MEDIUM: CardDimensionsPropTypes,
  WIDE: CardDimensionsPropTypes,
  LARGE: CardDimensionsPropTypes,
  XLARGE: CardDimensionsPropTypes,
});

export const TimeRangeOptionsPropTypes = (props, propName, componentName) => {
  let error;
  // if the
  if (props[propName]) {
    const timeRangeKeys = Object.keys(props[propName]);
    // only validate the options if they are populated
    if (timeRangeKeys.length > 0) {
      // throw error if timeRangeOptions does not include 'this' or 'last'
      const isError = timeRangeKeys.some(
        (key) => !key.includes('this') && !key.includes('last')
      );

      if (isError) {
        error = new Error(
          `\`${componentName}\` prop \`${propName}\` key's should include \`this\` or \`last\` i.e. \`{ thisWeek: 'This week', lastWeek: 'Last week'}\``
        );
      }
    }
  }
  return error;
};

export const CardPropTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  isEmpty: PropTypes.bool,
  isEditable: PropTypes.bool,
  /** goes full screen if expanded */
  isExpanded: PropTypes.bool,
  /** True if the card can be resizable in the DashboardGrid by dragging the borders */
  isResizable: PropTypes.bool,
  /**
   * Define the icon render to be rendered.
   * Can be a React component class
   */
  renderExpandIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /** should hide the header */
  hideHeader: PropTypes.bool,
  /** sets the CardWrapper CSS overflow to visible */
  showOverflow: deprecate(
    PropTypes.bool,
    '\nThe prop `showOverflow` for Card has been deprecated. It was previously needed for a custom positioned tooltip in the ValueCard, but the ValueCard now uses the default positioning of the tooltip. The `iot--card--wrapper--overflowing` class has been removed. For automated testing, you can target `data-testid="Card"` instead.'
  ),
  size: PropTypes.oneOf(Object.values(LEGACY_CARD_SIZES)),
  layout: PropTypes.oneOf(Object.values(CARD_LAYOUTS)),
  breakpoint: PropTypes.oneOf(Object.values(DASHBOARD_SIZES)),
  /** Optional selected range to pass at the card level */
  timeRange: PropTypes.string,
  /** Generates the available time range selection options. Each option should include 'this' or 'last'.
   * i.e. { thisWeek: 'This week', lastWeek: 'Last week'}
   */
  timeRangeOptions: TimeRangeOptionsPropTypes,
  availableActions: PropTypes.shape({
    edit: PropTypes.bool,
    clone: PropTypes.bool,
    delete: PropTypes.bool,
    expand: PropTypes.bool,
    range: PropTypes.bool,
  }),
  /** All the labels that need translation */
  i18n: PropTypes.shape({
    noDataLabel: PropTypes.string,
    noDataShortLabel: PropTypes.string,
    errorLoadingDataLabel: PropTypes.string,
    errorLoadingDataShortLabel: PropTypes.string,
    // card labels
    rollingPeriodLabel: PropTypes.string,
    last24HoursLabel: PropTypes.string,
    last7DaysLabel: PropTypes.string,
    lastMonthLabel: PropTypes.string,
    lastQuarterLabel: PropTypes.string,
    lastYearLabel: PropTypes.string,
    periodToDateLabel: PropTypes.string,
    thisWeekLabel: PropTypes.string,
    thisMonthLabel: PropTypes.string,
    thisQuarterLabel: PropTypes.string,
    thisYearLabel: PropTypes.string,
    hourlyLabel: PropTypes.string,
    dailyLabel: PropTypes.string,
    weeklyLabel: PropTypes.string,
    monthlyLabel: PropTypes.string,
    /** If no time range is selected we should show this string as the default */
    defaultLabel: PropTypes.node,
    // card actions
    selectTimeRangeLabel: PropTypes.string,
    editCardLabel: PropTypes.string,
    cloneCardLabel: PropTypes.string,
    deleteCardLabel: PropTypes.string,
    expandLabel: PropTypes.string,
    closeLabel: PropTypes.string,
    loadingDataLabel: PropTypes.string,
    overflowMenuDescription: PropTypes.string,
  }),
  tooltip: PropTypes.element,
  toolbar: PropTypes.element,
  /** Row height in pixels for each layout */
  rowHeight: RowHeightPropTypes,
  /** media query pixel measurement that determines which particular dashboard layout should be used */
  dashboardBreakpoints: DashboardBreakpointsPropTypes,
  /** map of number of columns to a given dashboard layout */
  dashboardColumns: DashboardColumnsPropTypes,
  /** array of configurable sizes to dimensions */
  cardDimensions: CardSizesToDimensionsPropTypes,
  /** optional function that should return an icon react element based on a icon name, it is called back with the icon name and then an object containing additional icon properties to add to the rendered icon */
  renderIconByName: PropTypes.func,
  /** Event handlers needed for Dashboard Grid - isEditable */
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchStart: PropTypes.func,
  onScroll: PropTypes.func,
  /** Optional event handlers */
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  /** Optionally adds tab index to card container */
  tabIndex: PropTypes.number,
  /** For testing */
  testID: PropTypes.string,
  /** the locale of the card, needed for number and date formatting */
  locale: PropTypes.string,
  /** a way to pass down dashboard grid resize handles, only used by other card types */
  resizeHandles: PropTypes.array,
};
