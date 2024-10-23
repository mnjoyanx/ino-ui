import React, { useState } from 'react';
import { Modal } from '../../src/index';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   // Example data and handlers
  //   const listData = Array.from({ length: 20 }, (_, i) => ({
  //     id: i,
  //     title: `Item ${i + 1}`,
  //   }));
  //   const gridData = Array.from({ length: 30 }, (_, i) => ({
  //     id: i,
  //     title: `Grid Item ${i + 1}`,
  //   }));

  return (
    <div className="App">
      <h1>Your Library Demo</h1>

      <h2>ListView Example</h2>
      {/* <ListView
        id="list-view-demo"
        itemsCount={5}
        itemsTotal={listData.length}
        buffer={2}
        itemWidth={10}
        itemHeight={5}
        isActive={true}
        data={listData}
        renderItem={({ item, isActive }) => (
          <div>
            {item.title} {isActive ? '(Active)' : ''}
          </div>
        )}
      />

      <h2>GridView Example</h2>
      <GridView
        id="grid-view-demo"
        rowItemsCount={5}
        rowCount={3}
        itemsTotal={gridData.length}
        itemWidth={10}
        itemHeight={10}
        isActive={true}
        data={gridData}
        renderItem={({ item, isActive }) => (
          <div>
            {item.title} {isActive ? '(Active)' : ''}
          </div>
        )}
        onChangeRow={() => {}}
      />

      <h2>CheckboxItem Example</h2>
      <CheckboxItem
        label="Sample Checkbox"
        isActive={true}
        onChange={isChecked => console.log('Checkbox changed:', isChecked)}
      />

      <h2>Modal Example</h2>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
      >
        <p>This is the modal content.</p>
      </Modal> */}

      <h2>Modal Example</h2>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      {/* <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
      >
        <p>This is the modal content.</p>
      </Modal> */}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        okBtnText="Save"
        onOk={() => {
          console.log('Save action');
          setIsModalOpen(false);
        }}
        cancelBtnText="Cancel"
        onCancel={() => {
          console.log('Cancel action');
          setIsModalOpen(false);
        }}
        showCloseIcon={true}
        onPrimaryMouseEnter={() => console.log('Mouse entered Save button')}
        onPrimaryMouseLeave={() => console.log('Mouse left Save button')}
        onSecondaryMouseEnter={() => console.log('Mouse entered Cancel button')}
        onSecondaryMouseLeave={() => console.log('Mouse left Cancel button')}
      >
        <p>
          This is the modal content. Hover over the buttons to see console logs.
        </p>
      </Modal>
    </div>
  );
};

export default App;
