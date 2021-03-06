import React from 'react'

class DeleteItemForm extends React.Component{
  handleDelete = async () => {
    const response = await fetch(`/api/transaction/delete/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cost: this.props.cost, budgetId: this.props.budgetId })
    });

    await response.json();
    this.props.fetchBudgets();
    this.props.fetchTransactions();
    this.props.fetchBalance();
    this.props.toggleModal();
  }

  render(){
    return(
      <div>
        <p>Are you sure?</p>
        <div className = "input-field col s6">
          <button className = "btn red" onClick={this.handleDelete}>Delete</button>
        </div>
        <div className = "input-field col s6">
          <button className = "btn" onClick = {() => this.props.toggleModal()}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default DeleteItemForm;