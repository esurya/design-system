// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

import React from 'react';
import { ButtonIcon } from '../../button-icons/base/example';
import { Th } from '../advanced/example';
import SvgIcon from '../../../shared/svg-icon';
import classNames from 'classnames';
import _ from 'lodash';

const columns = ['Name', 'Account Name', 'Close Date', 'Stage', 'Confidence', 'Amount', 'Contact'];

const rows = [{
  'recordName': 'Acme - 1,200 Widgets',
  'accountName': 'Acme',
  'closeDate': '4/10/15',
  'stage': 'Value Proposition',
  'confidence': '30%',
  'amount': '$25,000,000',
  'contact': 'jrogers@acme.com'
}, {
  'recordName': 'Acme - 200 Widgets',
  'accountName': 'Acme',
  'closeDate': '1/31/15',
  'stage': 'Prospecting',
  'confidence': '60%',
  'amount': '$5,000,000',
  'contact': 'bob@acme.com'
}, {
  'recordName': 'salesforce.com - 1,000 Widgets',
  'accountName': 'salesforce.com',
  'closeDate': '1/31/15 3:45PM',
  'stage': 'Id. Decision Makers',
  'confidence': '70%',
  'amount': '$25,000',
  'contact': 'nathan@salesforce.com'
}];

/// ////////////////////////////////////////
// Partial(s)
/// ////////////////////////////////////////

let Container = props =>
  <div className="slds-table_edit_container slds-is-relative" tabIndex={props.tabIndex} id={props.id}>
    {props.children}
  </div>;

export let Table = props =>
  <table className={classNames('slds-table slds-table_edit slds-table_bordered slds-table_fixed-layout slds-table_resizable-cols', props.className)} role="grid" style={{ width: '66.75rem' }}>
    {props.children}
  </table>;

let Thead = props =>
  <thead>
    <tr className="slds-line-height_reset">
      <th scope="col" style={{ width: '3.75rem' }}>
        <div className="slds-th__action">
          <span className="slds-assistive-text">Errors</span>
        </div>
      </th>
      <th scope="col" style={{ width: '2rem' }}>
        <div className="slds-th__action slds-th__action_form">
          <Checkbox label="Select All" />
        </div>
      </th>
      { props.children }
      <th scope="col" style={{ width: '3.25rem' }}>
        <div className="slds-th__action">
          <span className="slds-assistive-text">Actions</span>
        </div>
      </th>
    </tr>
  </thead>;

let Checkbox = props =>
  <label className="slds-checkbox">
    <input type="checkbox" name="options" disabled={props.disabled} defaultChecked={props.checked} tabIndex={props.tabIndex || '-1'} id={props.checkID} />
    <span className="slds-checkbox_faux" />
    <span className="slds-assistive-text">{props.label}</span>
  </label>;

let ButtonEdit = props =>
  <button className="slds-button slds-button_icon slds-cell-edit__button slds-m-left_x-small" tabIndex={props.tabIndex || '-1'} disabled={props.disabled} id={props.id}>
    <span className="slds-assistive-text">{props.alt}</span>
    <SvgIcon className={classNames('slds-button__icon slds-button__icon_hint', props.iconClassName)} sprite="utility" symbol={props.symbol || 'edit'} />
  </button>;

let EditPanel = props =>
  <section className="slds-popover slds-popover_edit" role="dialog" style={{ position: 'absolute', top: '0', left: '0.0625rem' }}>
    <span id="form-start" tabIndex="0" />
    <div className="slds-popover__body">
      { props.children }
    </div>
    <span id="form-end" tabIndex="0" />
  </section>;

let TableFocusInfo = props =>
  <div className="slds-box slds-table_edit_container-message">
    <p>To access the list, press Enter.</p>
    <p>To exit the list, press Esc.</p>
  </div>;

let ErrorPanel = props =>
  <div id="error-tooltip-01" className="slds-popover slds-nubbin_bottom-left slds-theme_error" role="tooltip" style={{ position: 'absolute', top: '-1rem', left: '0', width: 'auto' }}>
    <div className="slds-popover__body">Company encountered an error.</div>
  </div>;

export let RowData = props => {
  let checkboxLabel = 'Select item ' + props.index;

  return (
    <tr className="slds-hint-parent" aria-selected={props.checked}>
      <td id={props.cellID} tabIndex={props.errorindex} role="gridcell" className={classNames('slds-cell-edit slds-cell-error', props.editName)}>
        <button
          id={'error-0' + props.index}
          className={classNames('slds-button slds-button_icon slds-button_icon-error slds-m-horizontal_xxx-small', props.buttonInvisible)}
          tabIndex={props.errorindex || '-1'}
          aria-hidden={props.buttonInvisible ? 'true' : null}
          aria-describedby={props.buttonInvisible ? null : 'error-tooltip-01'}>
          <span className="slds-assistive-text">{'Item ' + props.index + ' has errors'}</span>
          <SvgIcon className="slds-button__icon" sprite="utility" symbol="warning" />
        </button>
        <span className="slds-row-number slds-text-body_small slds-text-color_weak" />
      </td>
      <td role="gridcell" className={classNames('slds-cell-edit', props.checkClass)} aria-selected={props.checkSelected}>
        <Checkbox label={checkboxLabel} tabIndex={!props.focusable ? '-1' : '0'} checkID="checkbox-01" />
      </td>
      <th scope="row" tabIndex={props.initialCellTabIndex} aria-selected={props.defaultSelected} className={classNames('slds-cell-edit', props.thClassName)}>
        <span className="slds-grid slds-grid_align-spread">
          <a href="javascript:void(0);" className="slds-truncate" tabIndex={props.initialCellTabIndex || '-1'} id={props.linkId} title={props.recordName}>
            { props.recordName }
          </a>
          <ButtonEdit iconClassName="slds-button__icon_edit" tabIndex={props.initialCellTabIndex} alt={'Edit Name: Item ' + props.index} />
        </span>
      </th>
      { !props.children
          ? <td role="gridcell" className="slds-cell-edit">
            <span className="slds-grid slds-grid_align-spread">
              <span className="slds-truncate" title={props.accountName}>{ props.accountName }</span>
              <ButtonEdit iconClassName="slds-button__icon_edit" tabIndex={!props.focusable ? '-1' : '0'} alt={'Edit Account Name: Item ' + props.index} />
            </span>
          </td>
        : props.children }
      <td role="gridcell" className="slds-cell-edit">
        <span className="slds-grid slds-grid_align-spread">
          <span className="slds-truncate" title={props.closeDate}>{ props.closeDate }</span>
          <ButtonEdit iconClassName="slds-button__icon_edit" tabIndex={!props.focusable ? '-1' : '0'} alt={'Edit Close Date: Item ' + props.index} />
        </span>
      </td>
      <td role="gridcell" className="slds-cell-edit">
        <span className="slds-grid slds-grid_align-spread">
          <span className="slds-truncate" title={props.stage}>{ props.stage }</span>
          <ButtonEdit iconClassName="slds-button__icon_edit" tabIndex={!props.focusable ? '-1' : '0'} alt={'Edit Stage: Item ' + props.index} />
        </span>
      </td>
      <td role="gridcell" className="slds-cell-edit" aria-readonly="true">
        <span className="slds-grid slds-grid_align-spread">
          <span className="slds-truncate" title={props.confidence}>{ props.confidence }</span>
          <ButtonEdit iconClassName="slds-button__icon_lock slds-button__icon_small" symbol="lock" tabIndex={!props.focusable ? '-1' : '0'} alt={'Confidence: Item ' + props.index} disabled />
        </span>
      </td>
      <td role="gridcell" className="slds-cell-edit">
        <span className="slds-grid slds-grid_align-spread">
          <span className="slds-truncate" title={props.amount}>{ props.amount }</span>
          <ButtonEdit iconClassName="slds-button__icon_edit" tabIndex={!props.focusable ? '-1' : '0'} alt={'Edit Amount: Item ' + props.index} />
        </span>
      </td>
      <td role="gridcell" className="slds-cell-edit">
        <span className="slds-grid slds-grid_align-spread">
          <span className="slds-truncate" title={props.contact}>{ props.contact }</span>
          <ButtonEdit iconClassName="slds-button__icon_edit" tabIndex={!props.focusable ? '-1' : '0'} alt={'Edit Contact: Item ' + props.index} />
        </span>
      </td>
      <td role="gridcell" className="slds-cell-edit">
        <div className="slds-p-right_medium">
          <ButtonIcon
            className="slds-button_icon-border-filled slds-button_icon-x-small"
            iconClassName="slds-button__icon_hint slds-button__icon_small"
            symbol="down"
            assistiveText="Show More"
            title="Show More"
            tabIndex={!props.focusable ? '-1' : '0'}
          />
        </div>
      </td>
    </tr>
  );
};

/// ///////////////////////////////////////////
// Export
/// ///////////////////////////////////////////

export default (
  <Container>
    <Table className="slds-no-cell-focus">
      <Thead>
        { _.times(columns.length, i =>
          <Th columnName={columns[i]} key={i} style={{ width: '8.75rem' }} />
        )}
      </Thead>
      <tbody>
        { _.times(rows.length, i =>
          <RowData key={i}
            index={i + 1}
            recordName={rows[i].recordName}
            accountName={rows[i].accountName}
            closeDate={rows[i].closeDate}
            stage={rows[i].stage}
            confidence={rows[i].confidence}
            amount={rows[i].amount}
            contact={rows[i].contact}
            initialCellTabIndex={(i === 0) ? '0' : '-1'}
            thClassName={(i === 0) ? 'slds-has-focus' : null}
            buttonInvisible="slds-hidden"
          />
        )}
      </tbody>
    </Table>
  </Container>
);

export let states = [
  {
    id: 'with-link',
    label: 'Cell focused - Link',
    element:
      <Container>
        <Table>
          <Thead>
            { _.times(columns.length, i =>
              <Th columnName={columns[i]} key={i} style={{ width: '8.75rem' }} />
            )}
          </Thead>
          <tbody>
            { _.times(rows.length, i =>
              <RowData key={i}
                index={i + 1}
                recordName={rows[i].recordName}
                accountName={rows[i].accountName}
                closeDate={rows[i].closeDate}
                stage={rows[i].stage}
                confidence={rows[i].confidence}
                amount={rows[i].amount}
                contact={rows[i].contact}
                initialCellTabIndex={(i === 0) ? '0' : '-1'}
                thClassName={(i === 0) ? 'slds-has-focus' : null}
                buttonInvisible="slds-hidden"

                linkId={(i === 0) ? 'link-01' : null}
                defaultSelected={(i === 0) ? true : null}
              />
            )}
          </tbody>
        </Table>
      </Container>,
    script: `
      document.getElementById('link-01').focus()
    `
  },
  {
    id: 'checkbox',
    label: 'Cell focused - Checkbox',
    element:
      <Container>
        <Table>
          <Thead>
            { _.times(columns.length, i =>
              <Th columnName={columns[i]} key={i} style={{ width: '8.75rem' }} />
            )}
          </Thead>
          <tbody>
            { _.times(rows.length, i =>
              <RowData key={i}
                index={i + 1}
                recordName={rows[i].recordName}
                accountName={rows[i].accountName}
                closeDate={rows[i].closeDate}
                stage={rows[i].stage}
                confidence={rows[i].confidence}
                amount={rows[i].amount}
                contact={rows[i].contact}
                initialCellTabIndex={(i === 0) ? '0' : '-1'}
                checkClass={(i === 0) ? 'slds-has-focus' : null}
                checkSelected={(i === 0) ? true : null}
                buttonInvisible="slds-hidden"
                defaultSelected={(i === 0) ? true : null}
              />
            )}
          </tbody>
        </Table>
      </Container>,
    script: `
      document.getElementById('checkbox-01').focus()
    `
  },
  {
    id: 'focused',
    label: 'Cell focused',
    element:
      <Container>
        <Table>
          <Thead>
            { _.times(columns.length, i =>
              <Th columnName={columns[i]} key={i} style={{ width: '8.75rem' }} />
            )}
          </Thead>
          <tbody>
            { _.times(rows.length, i =>
              <RowData key={i}
                index={i + 1}
                recordName={rows[i].recordName}
                accountName={rows[i].accountName}
                closeDate={rows[i].closeDate}
                stage={rows[i].stage}
                confidence={rows[i].confidence}
                amount={rows[i].amount}
                contact={rows[i].contact}
                buttonInvisible="slds-hidden"
                defaultSelected={(i === 0) ? true : null}>
                { (i === 0)
                  ? <td role="gridcell" aria-selected="true" className="slds-cell-edit slds-has-focus">
                    <span className="slds-grid slds-grid_align-spread">
                      <span className="slds-truncate" title="Acme">Acme</span>
                      <ButtonEdit id="button-01" iconClassName="slds-button__icon_edit" tabIndex="0" alt="Edit Name: Acme" />
                    </span>
                  </td>
                : null }
              </RowData>
            )}
          </tbody>
        </Table>
      </Container>,
    script: `
      document.getElementById('button-01').focus()
    `
  },
  {
    id: 'edit',
    label: 'Cell edit',
    element:
      <Container>
        <Table>
          <Thead>
            { _.times(columns.length, i =>
              <Th columnName={columns[i]} key={i} style={{ width: '8.75rem' }} />
            )}
          </Thead>
          <tbody>
            { _.times(rows.length, i =>
              <RowData key={i}
                index={i + 1}
                recordName={rows[i].recordName}
                accountName={rows[i].accountName}
                closeDate={rows[i].closeDate}
                stage={rows[i].stage}
                confidence={rows[i].confidence}
                amount={rows[i].amount}
                contact={rows[i].contact}
                buttonInvisible="slds-hidden">
                { (i === 0)
                  ? <td role="gridcell" aria-selected="true" className="slds-cell-edit">
                    <span className="slds-grid slds-grid_align-spread">
                      <span className="slds-truncate" title="Acme">Acme</span>
                      <ButtonEdit iconClassName="slds-button__icon_edit" tabIndex="0" alt="Edit Name: Acme" />
                    </span>
                    <EditPanel>
                      <div className="slds-form-element slds-grid">
                        <label className="slds-form-element__label slds-form-element__label_edit slds-no-flex" htmlFor="company-01">
                          <span className="slds-assistive-text">Company</span>
                        </label>
                        <div className="slds-form-element__control slds-grow">
                          <input id="company-01" className="slds-input" type="text" defaultValue="Acme Enterprises" />
                        </div>
                      </div>
                    </EditPanel>
                  </td>
                : null }
              </RowData>
            )}
          </tbody>
        </Table>
      </Container>,
    script: `
      document.getElementById('company-01').focus()
      document.getElementById('company-01').select()
    `
  },
  {
    id: 'required',
    label: 'Cell edit — Required',
    element:
      <Container>
        <Table>
          <Thead>
            { _.times(columns.length, i =>
              <Th columnName={columns[i]} key={i} style={{ width: '8.75rem' }} />
            )}
          </Thead>
          <tbody>
            { _.times(rows.length, i =>
              <RowData key={i}
                index={i + 1}
                recordName={rows[i].recordName}
                accountName={rows[i].accountName}
                closeDate={rows[i].closeDate}
                stage={rows[i].stage}
                confidence={rows[i].confidence}
                amount={rows[i].amount}
                contact={rows[i].contact}
                buttonInvisible="slds-hidden">
                { (i === 0)
                  ? <td role="gridcell" aria-selected="true" className="slds-cell-edit">
                    <span className="slds-grid slds-grid_align-spread">
                      <span className="slds-truncate" title="Acme">Acme</span>
                      <ButtonEdit iconClassName="slds-button__icon_edit" tabIndex="0" alt="Edit Name: Acme" />
                    </span>
                    <EditPanel>
                      <div className="slds-form-element slds-grid">
                        <label className="slds-form-element__label slds-form-element__label_edit slds-no-flex" htmlFor="company-01">
                          <abbr className="slds-required" title="required">*</abbr>
                          <span className="slds-assistive-text">Company</span>
                        </label>
                        <div className="slds-form-element__control slds-grow">
                          <input id="company-01" className="slds-input input--required" type="text" defaultValue="Acme" required />
                        </div>
                      </div>
                    </EditPanel>
                  </td>
                : null }
              </RowData>
            )}
          </tbody>
        </Table>
      </Container>,
    script: `
      document.getElementById('company-01').focus()
      document.getElementById('company-01').select()
    `
  },
  {
    id: 'error',
    label: 'Cell edit — Error',
    element:
      <Container>
        <Table>
          <Thead>
            { _.times(columns.length, i =>
              <Th columnName={columns[i]} key={i} style={{ width: '8.75rem' }} />
            )}
          </Thead>
          <tbody>
            { _.times(rows.length, i =>
              <RowData key={i}
                index={i + 1}
                recordName={rows[i].recordName}
                accountName={rows[i].accountName}
                closeDate={rows[i].closeDate}
                stage={rows[i].stage}
                confidence={rows[i].confidence}
                amount={rows[i].amount}
                contact={rows[i].contact}
                buttonInvisible="slds-hidden">
                { (i === 0)
                  ? <td role="gridcell" aria-selected="true" className="slds-cell-edit">
                    <span className="slds-grid slds-grid_align-spread">
                      <span className="slds-truncate" title="Acme">Acme</span>
                      <ButtonEdit iconClassName="slds-button__icon_edit" tabIndex="0" alt="Edit Name: Acme" />
                    </span>
                    <EditPanel>
                      <div className="slds-form-element slds-has-error slds-grid slds-wrap">
                        <label className="slds-form-element__label slds-form-element__label_edit slds-no-flex" htmlFor="company-01">
                          <abbr className="slds-required" title="required">*</abbr>
                          <span className="slds-assistive-text">Company</span>
                        </label>
                        <div className="slds-form-element__control slds-grow">
                          <input id="company-01" className="slds-input input--required" type="text" defaultValue="Acme" required aria-describedby="error-message-01" />
                        </div>
                      <div id="error-message-01" className="slds-form-element__help">This field is required</div>
                      </div>
                    </EditPanel>
                  </td>
                : null }
              </RowData>
            )}
          </tbody>
        </Table>
      </Container>,
    script: `
      document.getElementById('company-01').focus()
      document.getElementById('company-01').select()
    `
  },
  {
    id: 'edited',
    label: 'Cell edited',
    element:
      <Container>
        <Table>
          <Thead>
            { _.times(columns.length, i =>
              <Th columnName={columns[i]} key={i} style={{ width: '8.75rem' }} />
            )}
          </Thead>
          <tbody>
            { _.times(rows.length, i =>
              <RowData key={i}
                index={i + 1}
                recordName={rows[i].recordName}
                accountName={rows[i].accountName}
                closeDate={rows[i].closeDate}
                stage={rows[i].stage}
                confidence={rows[i].confidence}
                amount={rows[i].amount}
                contact={rows[i].contact}
                buttonInvisible="slds-hidden">
                { (i === 0)
                  ? <td role="gridcell" aria-selected="true" className="slds-cell-edit slds-is-edited">
                    <span className="slds-grid slds-grid_align-spread">
                      <span className="slds-truncate" title="Acme">Acme</span>
                      <ButtonEdit iconClassName="slds-button__icon_edit" tabIndex="0" alt="Edit Name: Acme" />
                    </span>
                  </td>
                : null }
              </RowData>
            )}
          </tbody>
        </Table>
      </Container>
  },
  {
    id: 'row-error',
    label: 'Error - Row level on save',
    element:
      <Container>
        <Table>
          <Thead>
            { _.times(columns.length, i =>
              <Th columnName={columns[i]} key={i} style={{ width: '8.75rem' }} />
            )}
          </Thead>
          <tbody>
            { _.times(rows.length, i =>
              <RowData key={i}
                index={i + 1}
                recordName={rows[i].recordName}
                accountName={rows[i].accountName}
                closeDate={rows[i].closeDate}
                stage={rows[i].stage}
                confidence={rows[i].confidence}
                amount={rows[i].amount}
                contact={rows[i].contact}
                buttonInvisible={(i != 0) ? 'slds-hidden' : null}>
                { (i === 0)
                  ? <td role="gridcell" aria-selected="true" className="slds-cell-edit slds-has-error slds-has-focus">
                    <span className="slds-grid slds-grid_align-spread">
                      <span className="slds-truncate" title="Acme">Acme</span>
                      <ButtonEdit id="button-01" iconClassName="slds-button__icon_edit" tabIndex="0" alt="Edit Name: {field error} Edited: Acme" />
                    </span>
                  </td>
                : null }
              </RowData>
            )}
          </tbody>
        </Table>
      </Container>,
    script: `
      document.getElementById('button-01').focus()
    `
  },
  {
    id: 'row-error-focused',
    label: 'Error indicator - Focused',
    element:
      <Container>
        <Table>
          <Thead>
            { _.times(columns.length, i =>
              <Th columnName={columns[i]} key={i} style={{ width: '8.75rem' }} />
            )}
          </Thead>
          <tbody>
            { _.times(rows.length, i =>
              <RowData key={i}
                index={i + 1}
                recordName={rows[i].recordName}
                accountName={rows[i].accountName}
                closeDate={rows[i].closeDate}
                stage={rows[i].stage}
                confidence={rows[i].confidence}
                amount={rows[i].amount}
                contact={rows[i].contact}
                editName={(i === 0) ? 'slds-has-focus' : null}
                errorindex={(i === 0) ? '0' : null}
                buttonInvisible={(i != 0) ? 'slds-hidden' : null}>
                { (i === 0)
                  ? <td role="gridcell" aria-selected="true" className="slds-cell-edit slds-has-error">
                    <span className="slds-grid slds-grid_align-spread">
                      <span className="slds-truncate" title="Acme">Acme</span>
                      <ButtonEdit id="button-01" iconClassName="slds-button__icon_edit" tabIndex="-1" alt="Edit Name: {field error} Edited: Acme" />
                    </span>
                  </td>
                : null }
              </RowData>
            )}
          </tbody>
        </Table>
        <ErrorPanel />
      </Container>,
    script: `
      document.getElementById('error-01').focus()
    `
  },
  {
    id: 'header-cell-focused',
    label: 'Header cell focused',
    element:
      <Container>
        <Table>
          <Thead>
            { _.times(columns.length, i =>
              <Th key={i}
                className={(i === 0) ? 'slds-has-focus' : null}
                columnName={columns[i]}
                focusable
                style={{ width: '8.75rem' }} />
            )}
          </Thead>
          <tbody>
            { _.times(rows.length, i =>
              <RowData key={i}
                index={i + 1}
                recordName={rows[i].recordName}
                accountName={rows[i].accountName}
                closeDate={rows[i].closeDate}
                stage={rows[i].stage}
                confidence={rows[i].confidence}
                amount={rows[i].amount}
                contact={rows[i].contact}
                buttonInvisible="slds-hidden"
              />
            )}
          </tbody>
        </Table>
      </Container>
  },
  {
    id: 'header-cell-marked',
    label: 'Header cell marked',
    element:
      <Container>
        <Table className="slds-no-cell-focus">
          <Thead>
            { _.times(columns.length, i =>
              <Th key={i}
                className={(i === 0) ? 'slds-has-focus' : null}
                columnName={columns[i]}
                style={{ width: '8.75rem' }} />
            )}
          </Thead>
          <tbody>
            { _.times(rows.length, i =>
              <RowData key={i}
                index={i + 1}
                recordName={rows[i].recordName}
                accountName={rows[i].accountName}
                closeDate={rows[i].closeDate}
                stage={rows[i].stage}
                confidence={rows[i].confidence}
                amount={rows[i].amount}
                contact={rows[i].contact}
                buttonInvisible="slds-hidden"
              />
            )}
          </tbody>
        </Table>
      </Container>
  }
];
