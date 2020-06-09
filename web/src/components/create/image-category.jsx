import React from 'react';
import {compose, lifecycle, withState, withHandlers} from 'recompose';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import Divider from '@material-ui/core/Divider';
import {Field, change} from 'redux-form';
import Typography from '@material-ui/core/Typography/Typography';
import UploadImageField from '../common/upload-image-field';
import {iconCategories, iconSubCategories} from '../constants/category-icons';
import {getPlaceCategories} from '../../store/reducers/places';

const ImageCategory = props => {
  const {imageUrl, categories, setCategory, selectedCategory, change, setSubCategory, selectedSubCategory} = props;

  const selectCategory = item => {
    change('createPlace', 'type', item.type);
    setCategory(item);
  };

  const selectSubCategory = item => {
    change('createPlace', 'iconImage', item.iconImage);
    change('createPlace', 'iconSize', item.iconSize);
    setSubCategory(item);
  };

  return (
    <React.Fragment>
      <Grid container justify="center" style={{width: '100%'}}>
        <Field
          name="image"
          component={UploadImageField}
          imageUrl={imageUrl}
        />
      </Grid>
      <Divider style={{width: '100%', marginTop: 10}}/>
      <Grid container justify="center">
        {
          categories.map(item => (
            <Paper key={item.name} className={selectedCategory._id === item._id ? 'category-active' : 'category'} onClick={item.subCategories.length > 0 && (() => selectCategory(item))}>
              <div className="category-name">
                <Typography style={{fontSize: '0.7em', color: '#4b9635', display: 'block'}} variant="h2">{iconCategories[item.name] && iconCategories[item.name].label}</Typography>
              </div>
              {<div className="category-icon">
                   {iconCategories[item.name] && iconCategories[item.name].icon}
                 </div>}
            </Paper>
          ))
        }
      </Grid>
      <Divider style={{width: '100%'}}/>
      {
        selectedCategory.subCategories &&
        <Grid container style={{marginTop: 10}} justify="center">
          {
            selectedCategory.subCategories.map(item => (
              <Paper key={item.name} className={selectedSubCategory.name === item.name ? 'sub-category-active' : 'sub-category'} onClick={() => selectSubCategory(item)}>
                <div className="sub-category-name">
                  <Typography style={{fontSize: '0.7em', color: '#4b9635', display: 'block'}} variant="h2">{iconSubCategories[item.name] && iconSubCategories[item.name].label}</Typography>
                </div>
              {<div className="sub-category-icon">
                   {iconSubCategories[item.name] && iconSubCategories[item.name].icon}
                 </div>}
              </Paper>
            ))
          }
        </Grid>
      }
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  categories: state.placesState.categories,
});

export default compose(
  connect(mapStateToProps, {getPlaceCategories, change}),
  withState('selectedCategory', 'setCategory', {}),
  withState('selectedSubCategory', 'setSubCategory', {}),
  lifecycle({
    componentDidMount() {
      const {getPlaceCategories} = this.props;
      getPlaceCategories();
    },
  }),
)(ImageCategory);
