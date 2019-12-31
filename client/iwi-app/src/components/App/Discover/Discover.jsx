import React, { Component } from 'react';
import FoundPeopleList from '../../DiscoverComponents/FoundPeopleList';
import { connect } from 'react-redux';
import UsersService from '../../../services/UsersService';
import SearchForm from '../../Forms/SearchForm';
import PropTypes from 'prop-types';
import { List } from 'immutable';

class Discover extends Component {
    render() {
        return (
            <main>
                <div>
                    <div className="search">
                        <h1>Discover more people</h1>
                        <SearchForm searchHandler={this.props.search} />
                    </div>
    
                    <FoundPeopleList
                        foundUsers={this.props.foundUsers.toJS()}
                        fetchStatus={this.props.fetchStatus}
                    />
                </div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        fetchStatus: state.systemReducer.get('fetchStatus'),
        foundUsers: state.usersReducer.get('foundUsers')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        search: (data) => dispatch(UsersService.searchUser(data))
    }
}

Discover.propTypes = {
    foundUsers: PropTypes.instanceOf(List),
    fetchStatus: PropTypes.number,
    search: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
