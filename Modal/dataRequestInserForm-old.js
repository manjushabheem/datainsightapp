
import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form'
import PropTypes from 'prop-types';
import Utils from '../_shared/_utils';
import renderField from '../CommonComponents/RenderField';
import renderSelect from '../CommonComponents/renderSelect';
import RenderFile from '../CommonComponents/RenderFile';
import RenderCheckbox from '../CommonComponents/RenderCheckbox';
//import { COUNTRIES } from './countries';
//import { WithContext as ReactTags } from 'react-tag-input';

// const suggestions = COUNTRIES.map( ( country ) => {
//     return {
//         id: country,
//         text: country,
//     }
// })

// const KeyCodes = {
//     comma: 188,
//     enter: 13,
// };

// const delimiters = [ KeyCodes.comma, KeyCodes.enter ];

class DataRequestInsert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormStep: 'step1',
            isFormstep3: false,
            fileData: [],
            insertMsg: '',
            errMsg: '',
            //tags: [ { id: 'Thailand', text: 'Thailand' }, { id: 'India', text: 'India' } ],
            //suggestions: suggestions,
            disableBtn: true,
            formName: 'pdf',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createReqForm = this.createReqForm.bind(this);
        this.onFileChange = this.onFileChange.bind(this);

        // react tag
        // this.handleDelete = this.handleDelete.bind(this);
        // this.handleAddition = this.handleAddition.bind(this);
        // this.handleDrag = this.handleDrag.bind(this);
        // this.handleTagClick = this.handleTagClick.bind(this);
    }
    static propTypes = {
        history: PropTypes.object.isRequired,
        input: PropTypes.object,
        handleSubmit: PropTypes.func,
        pristine: PropTypes.bool,
        submitting: PropTypes.bool,
        closeInsertModal: PropTypes.func,
    };

    createReqForm(step) {
        if (step === '1') {
            this.setState({
                formName: 'pdf',
            });
        } else if (step === '2') {
            this.setState({
                formName: 'reconciliation',
            });
        } else if (step === '3') {
            this.setState({
                formName: 'location_code',
            });
        }
        this.setState({
            isFormStep: step,
            fileData: [],
        });
    }

    onFileChange(file) {
        console.log('file::', file)
        //this.setState( { fileData: file} );
        if ( file === 'disable' ) {
            this.setState( {
                disableBtn: true,
                fileData: [],
            } )
        } else {
        this.setState({
            fileData: [ ...this.state.fileData, file ],
            //fileData: file,
            disableBtn: false,
        })
        }
    }

    handleSubmit(values) {
        let data = new FormData();
        data.append('login_user_name', Utils.getLocalStorage('fullname'))
        data.append('login_ldapid', Utils.getLocalStorage('ldapid'))
        data.append('req_name', values.req_name)
        if (values.req_source_type) {
            data.append('req_source_type', values.req_source_type)
        }
        if (values.req_type) {
            data.append('req_type', values.req_type)
        }       
        
        data.append('req_tags', values.req_tag)
        data.append('form_name', this.state.formName)

        /* let reqType = [ 0, 1 ];
         values.req_type.map(function (item, i) {           
             data.append(reqType[i], item)
         })*/
        
        let file = [ 0, 1, 2 ];
        this.state.fileData.map(function (item, i) {
            data.append(file[i], item)
        })
        //console.log('data', data);
        //console.log('this.state.fileData', this.state.fileData);
        //let insertValues = reqBody;
        fetch(`${Utils.getApiBaseUrl()}/newrequest`, {
            //Utils.getPostOptions( insertValues ),
            method: 'POST',
            body: data,       
        }
        ).then((response) => {
            return response.json();
        }).then((data) => {
            console.log('data', this.props);
            if (data.isSuccess) {
                //console.log('data', data);
                this.setState({ insertMsg: 'New Request has been submitted' });
                setTimeout(this.props.closeInsertModal(), 500);
                this.props.history.push('/my-request')           
            } else {
                this.setState({ insertMsg: 'Upload Error. Please Try Again' });               
            }
        });
    }

    // handleDelete(i) {
    //     const { tags } = this.state;
    //     this.setState({
    //         tags: tags.filter((tag, index) => index !== i),
    //     });
    // }

    // handleAddition(tag) {
    //     this.setState(state => ({ tags: [ ...state.tags, tag ] }));
    // }

    // handleDrag(tag, currPos, newPos) {
    //     const tags = [ ...this.state.tags ];
    //     const newTags = tags.slice();

    //     newTags.splice(currPos, 1);
    //     newTags.splice(newPos, 0, tag);

    //     // re-render
    //     this.setState({ tags: newTags });
    // }

    // handleTagClick(index) {
    //     console.log('The tag at index ' + index + ' was clicked');
    // }


    render() {
        const { handleSubmit, pristine, submitting } = this.props;
        const { isFormStep, insertMsg, tags, suggestions, disableBtn } = this.state;

        return (
            <form method="post" onSubmit={handleSubmit(this.handleSubmit)} encType="multipart/form-data">
                <div className="formnav">
                    <button className={isFormStep === 'step1' ? 'md-button next-step' : 'md-button next-step inactive'} type="button" onClick={() => this.createReqForm('step1')}> PDF UPLOAD </button>
                    <button className={isFormStep === 'step2' ? 'md-button next-step' : 'md-button next-step inactive'} type="button" onClick={() => this.createReqForm('step2')}> Reconciliation </button>
                    <button className={isFormStep === 'step3' ? 'md-button next-step' : 'md-button next-step inactive'} type="button" onClick={() => this.createReqForm('step3')}> Location Code </button>
                </div>
                <div className="sub_req">
                    <div className="request_id">
                        <div className="requestor_info">
                            <label>Name<span>*</span></label>
                            <Field
                                name="req_name"
                                type="text"
                                component={renderField}
                                aria-required="true"
                            />
                        </div>
                        {isFormStep !== 'step1' ?
                            <div className="requestor_period">
                                <label>Source <span>*</span></label>
                                <Field name="req_source_type" component={renderSelect} type="select">
                                    <option value="Oracle">Oracle </option>
                                    <option value="HFM">HFM </option>
                                    <option value="PLX">PLX </option>
                                    <option value="GCore">GCore </option>
                                    <option value="file">File Upload </option>
                                </Field>
                            </div>
                            : ''}
                        {isFormStep !== 'step1' ?
                            <div className="requestor_period">
                                <label>Data Type <span>*</span></label>
                                <div>
                                    <Field name="req_type" label="" options={[ 'Others', 'Trial Balance', 'General Ledger', 'Fixed Asset' ]} component={RenderCheckbox} />
                                    {/*<Field
                                    name="req_type_others"
                                    component={RenderCheckbox}
                                    type="checkbox"
                                    aria-required="true"
                                    label="Others"                                    
                                />*/}
                                    {/* <Field
                                name="req_name"                           
                                type="checkbox"
                                component={renderField}
                                aria-required="true"
                                />   */}

                                    {/* <Field
                                    name="req_type[]"
                                    type="checkbox"
                                    component={RenderCheckbox}
                                    aria-required="true"
                                    label="Trial Balance"
                                />
                                <Field
                                    name="req_type[]"
                                    type="checkbox"
                                    component={RenderCheckbox}
                                    aria-required="true"
                                    label="Fixed Asset"
                                />
                                <Field
                                    name="req_type[]"
                                    type="checkbox"
                                    component={RenderCheckbox}
                                    aria-required="true"
                                    label="General Ledger Fixed Asset"
                               />*/}
                                </div>
                            </div>
                            : ''}

                        {isFormStep === 'step1' ?
                            <div className="requestor_upload js">
                                <span className="fupload">File Upload*</span>
                                <Field
                                    name="file[]"
                                    component={RenderFile}
                                    type="file"
                                    className="inputfile inputfile-6"
                                    onFileChange={this.onFileChange}
                                    filter="pdf"
                                />
                            </div>
                            : ''}

                        {isFormStep === 'step1' ?
                            <div className="requestor_info">
                                <label>Tags <span>*</span></label>
                                {/* <ReactTags
                                    tags={tags}
                                    suggestions={suggestions}
                                    delimiters={delimiters}
                                    handleDelete={this.handleDelete}
                                    handleAddition={this.handleAddition}
                                    handleDrag={this.handleDrag}
                                    handleTagClick={this.handleTagClick}
                                /> */}
                                <Field
                                    name="req_tag"
                                    type="text"
                                    component={renderField}
                                    aria-required="true"
                                />
                            </div>
                            : ''}

                        {isFormStep === 'step3' ?
                            <div className="requestor_upload js">
                                <span className="fupload">File Upload*</span>
                                <Field name="file[]" component={RenderFile} type="file" className="inputfile inputfile-6" onFileChange={this.onFileChange} />
                            </div>
                            : ''}
                        {isFormStep === 'step2' ?
                            <div className="requestor_upload js">
                                <span className="fupload">File Upload*</span>
                                <Field name="file[]" component={RenderFile} type="file" className="inputfile inputfile-6" onFileChange={this.onFileChange} />
                            </div>
                            : ''}
                        {isFormStep === 'step2' ?
                            <div className="requestor_upload js">
                                <span className="fupload">File Upload*</span>
                                <Field name="file[]" component={RenderFile} type="file" className="inputfile inputfile-6" onFileChange={this.onFileChange} />
                            </div>
                            : ''}
                        {isFormStep === 'step2' ?
                            <div className="requestor_upload js">
                                <span className="fupload">File Upload*</span>
                                <Field name="file[]" component={RenderFile} type="file" className="inputfile inputfile-6" onFileChange={this.onFileChange} />
                            </div>
                            : ''}
                        {/*<div className="requestor_upload js">
                        <span className="fupload">File Upload*</span>
                        <input 
                        type="file" 
                        name="file-7[]" 
                        id="fileupload" 
                        className="inputfile inputfile-6" 
                        multiple/>
                        <label htmlFor="file-7">
                        <span></span> 
                        <i className="icon ion-ios-cloud-upload"></i>
                        </label>                                      
                    </div>
                    <div className="requestor_upload js">
                        <span className="fupload">File Upload*</span>
                        <input 
                        type="file" 
                        name="file-7[]" 
                        id="fileupload" 
                        className="inputfile inputfile-6" 
                        multiple/>
                        <label htmlFor="file-7">
                        <span></span> 
                        <i className="icon ion-ios-cloud-upload"></i>
                        </label>                                      
                    </div>*/}
                        <button
                            className="md-primary md-raised md-accent md-button"
                            type="submit"
                            disabled={pristine | submitting | disableBtn}>
                            Submit
                    </button>
                        {insertMsg ? <div className="formMsg"> {insertMsg}</div> : ''}

                    </div>
                </div>
            </form>
        );
    }
}
const afterSubmit = (result, dispatch) =>
    dispatch(reset('DataRequestInsert'));

export default reduxForm({
    form: 'DataRequestInsert', //a unique identifier for this form
    onSubmitSuccess: afterSubmit,
})(DataRequestInsert);