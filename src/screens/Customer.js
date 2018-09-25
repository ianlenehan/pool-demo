import React, { Component } from 'react'
import faker from 'faker'
import moment from 'moment'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import GoogleMapReact from 'google-map-react';
import { PersonPin, Edit, MoreVert } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import axios from 'axios'
import SwipeableViews from 'react-swipeable-views';
import './Customer.css'

const MapPin = ({ text }) => {
    return (
      <div>
        <PersonPin className="map-pin" />
        <span className="map-pin">{text}</span>
      </div>
    )
}

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

class Customer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      readOnly: false,
      lat: null,
      lng: null,
      customer: null,
      status: 'New Customer',
      anchorEl: null,
      tabValue: 0,
    }
  }

  componentDidMount() {
    this.createCustomer()
  }

  createCustomer() {
    const name = faker.name.findName()
    const street = '110 Reynolds Street'
    const suburb = 'Balmain'
    const state = 'NSW'
    const postCode = '2000'
    const phone = faker.phone.phoneNumber()
    const email = faker.internet.email()
    const fakeDate = faker.date.past()
    const date = moment(fakeDate).format('DD-MM-YYYY')
    const consultant = faker.helpers.randomize(["Joe Anson", "Derek Glinka", "Brent McDonald"])
    const status = faker.helpers.randomize(["Contract", "Lost", "No Pool", "Unwanted"])
    const address = `${street}, ${suburb}, ${state} ${postCode} AU`

    const customer = { id: 1, name, street, suburb, state, postCode, address, phone, email, date, consultant, status };
    this.getLatLong(customer.address)
    return this.setState({ customer })
  }

  async getLatLong(address) {
    const paramString = address.replace(/ /g,'+')
    const urlPrefix = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    const apiUrl = `${urlPrefix}${paramString}&key=AIzaSyB1aBbFaDBOuaCRSflXeCZPGDwlQ0eQUGE`
    const res = await axios.get(apiUrl)
    const { location } = res.data.results[0].geometry
    return this.setState({ lat: location.lat, lng: location.lng })
  }

  handleChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { customer, lat, lng, anchorEl } = this.state
    if (this.state.customer) {
      return (
        <div className="customer-container">
          <Card className="customer-card">
            <CardContent className="customer-card-content">
              <div className="customer-header">
                <div>
                  <Typography align="left" variant="headline" color="textSecondary">
                    Customer Detail
                  </Typography>
                  <Typography align="left" variant="title" component="h3">
                    {customer.name}
                  </Typography>
                </div>
                <div>
                  <Tooltip
                    title="Edit Customer"
                    enterDelay={100}
                  >
                    <IconButton variant="fab" color="primary" aria-label="Add">
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title="More Options"
                    enterDelay={100}
                  >
                    <IconButton
                      aria-owns={anchorEl ? 'simple-menu' : null}
                      aria-haspopup="true"
                      variant="fab"
                      color="primary"
                      onClick={e => this.setState({ anchorEl: e.currentTarget })}
                    >
                      <MoreVert />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <TextField
                  label="Name"
                  value={customer.name}
                  className="text-field"
                  margin="normal"
                  InputProps={{
                    readOnly: this.state.readOnly,
                  }}
                />
                <FormControl className="text-field" margin="normal">
                  <InputLabel htmlFor="age-simple">Status</InputLabel>
                  <Select
                    value={this.state.status}
                    className="status-select"
                    onChange={e => this.setState({ status: e.target.value })}
                    inputProps={{
                      name: 'status',
                      id: 'status-simple',
                    }}
                  >
                    <MenuItem value={'New Customer'}>New Customer</MenuItem>
                    <MenuItem value={'Contacted'}>Contacted</MenuItem>
                    <MenuItem value={'Quoted'}>Quoted</MenuItem>
                    <MenuItem value={'Contract'}>Contract</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <TextField
                label="Street"
                value={customer.street}
                className="text-field"
                margin="normal"
                InputProps={{
                  readOnly: this.state.readOnly,
                }}
              />
              <div style={{ display: 'flex' }}>
                <TextField
                  label="Suburb"
                  value={customer.suburb}
                  className="text-field"
                  margin="normal"
                  InputProps={{
                    readOnly: this.state.readOnly,
                  }}
                />
                <TextField
                  label="State"
                  value={customer.state}
                  className="text-field"
                  margin="normal"
                  InputProps={{
                    readOnly: this.state.readOnly,
                  }}
                />
                <TextField
                  label="Postcode"
                  value={customer.postCode}
                  className="text-field"
                  margin="normal"
                  InputProps={{
                    readOnly: this.state.readOnly,
                  }}
                />
              </div>
              <div style={{ display: 'flex' }}>
                <TextField
                  label="Phone"
                  value={customer.phone}
                  className="text-field"
                  margin="normal"
                  InputProps={{
                    readOnly: this.state.readOnly,
                  }}
                />
                <TextField
                  label="Email"
                  value={customer.email}
                  className="text-field"
                  margin="normal"
                  InputProps={{
                    readOnly: this.state.readOnly,
                  }}
                />
              </div>
              <div className="customer-actions">

                <div style={{ display: 'flex' }}>

                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={e => this.setState({ anchorEl: null })}>Send Email</MenuItem>
                    <MenuItem onClick={e => this.setState({ anchorEl: null })}>Send SMS</MenuItem>
                    <MenuItem onClick={e => this.setState({ anchorEl: null })}>Order Booklet</MenuItem>
                  </Menu>
                </div>
              </div>
            </CardContent>
            <div className="map-container">
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyB1aBbFaDBOuaCRSflXeCZPGDwlQ0eQUGE' }}
                defaultCenter={{ lat, lng }}
                defaultZoom={15}
              >
                <MapPin
                  lat={lat}
                  lng={lng}
                  text={customer.street}
                />
              </GoogleMapReact>
            </div>

          </Card>
          <div className="tab-container">
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.tabValue}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab label="Notes" />
                <Tab label="Documents" />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={'x'}
              index={this.state.tabValue}
              onChangeIndex={this.handleChangeIndex}
              className="customer-swipe-view"
            >
              <TabContainer className="customer-tab" dir={'right'}>Notes</TabContainer>
              <TabContainer className="customer-tab" dir={'right'}>Documents</TabContainer>
            </SwipeableViews>
          </div>
        </div>
      )
    }
    return <p>Loading...</p>
  }
}

export default Customer
