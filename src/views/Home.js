import React from 'react';
import Helmet from 'react-helmet';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {fetchHearingList} from 'actions';
import HearingList from 'components/HearingList';

class Home extends React.Component {
  /**
   * Return a promise that will, as it fulfills, have added requisite
   * data for the home view into the dispatch's associated store.
   *
   * @param dispatch Redux Dispatch function
   * @return {Promise} Data fetching promise
   */
  static fetchData(dispatch) {
    return Promise.all([
      dispatch(fetchHearingList("nextClosingHearing", "/v1/hearing/", {next_closing: (new Date().toISOString())})),
      dispatch(fetchHearingList("newestHearings", "/v1/hearing/", {order: "-created_at"}))
    ]);
  }

  componentDidMount() {
    Home.fetchData(this.props.dispatch);
  }

  render() {
    const {formatMessage} = this.props.intl;
    const {hearingLists} = this.props;
    return (<div className="container">
      <Helmet title={formatMessage({id: 'welcome'})}/>
      <h1><FormattedMessage id="welcome"/></h1>
      <p>A welcome message in {this.context.language}.</p>
      <hr/>
      <h2><FormattedMessage id="nextClosingHearing"/></h2>
      <HearingList hearings={hearingLists.nextClosingHearing} />
      <h2><FormattedMessage id="newestHearings"/></h2>
      <HearingList hearings={hearingLists.newestHearings} />
    </div>);
  }
}

Home.propTypes = {
  intl: intlShape.isRequired,
  dispatch: React.PropTypes.func,
  hearingLists: React.PropTypes.object
};
Home.contextTypes = {language: React.PropTypes.string};

const WrappedHome = connect((state) => ({hearingLists: state.hearingLists}))(injectIntl(Home));
// We need to re-hoist the static fetchData to the wrapped component due to react-intl:
WrappedHome.fetchData = Home.fetchData;
export default WrappedHome;
