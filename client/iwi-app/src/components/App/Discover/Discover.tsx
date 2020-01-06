import React, { Component } from 'react';
import FoundPeopleList from '../../DiscoverComponents/FoundPeopleList';
import { connect } from 'react-redux';
import UsersService from '../../../services/UsersService';
import SearchForm from '../../Forms/SearchForm';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import SearchData from '../../../interfaces/SearchData.interface';
import Store from '../../../interfaces/Store/Store.interface';
import { DiscoverProps, connector } from '../../../interfaces/Components/Discover/DiscoverProps.interface';

class Discover extends Component<DiscoverProps> {
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

// Discover.propTypes = {
//     foundUsers: PropTypes.instanceOf(List),
//     fetchStatus: PropTypes.number,
//     search: PropTypes.func,
// };

export default connector(Discover);
