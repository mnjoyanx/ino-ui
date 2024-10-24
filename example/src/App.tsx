import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'ino-ui-tv/dist/styles/styles.css';
import { Modal, CheckboxItem } from 'ino-ui-tv';
import './styles.css';

const ComponentPreview = ({ component: Component, props }) => {
  return (
    <div className="component-preview">
      <h2>Component Preview</h2>
      <Component {...props} />
    </div>
  );
};

const ComponentDocs = ({ docs }) => {
  return (
    <div className="component-docs">
      <h2>Component Documentation</h2>
      <pre>{JSON.stringify(docs, null, 2)}</pre>
    </div>
  );
};

const ComponentPage = ({ component, props, docs }) => {
  return (
    <div className="component-page">
      <ComponentPreview component={component} props={props} />
      <ComponentDocs docs={docs} />
    </div>
  );
};

const ModalPage = () => (
  <ComponentPage
    component={Modal}
    props={{
      isOpen: true,
      onClose: () => {},
      title: 'Example Modal',
      children: <p>This is the modal content.</p>,
      okBtnText: 'OK',
      cancelBtnText: 'Cancel',
    }}
    docs={Modal.propTypes}
  />
);

const CheckboxPage = () => (
  <ComponentPage
    component={CheckboxItem}
    props={{
      label: 'Sample Checkbox',
      isActive: true,
      onChange: () => {},
    }}
    docs={CheckboxItem.propTypes}
  />
);

const App = () => {
  return (
    <Router>
      <div className="app">
        <aside>
          <nav>
            <ul>
              <li>
                <Link to="/modal">Modal</Link>
              </li>
              <li>
                <Link to="/checkbox">Checkbox</Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main>
          <Routes>
            <Route path="/modal" element={<ModalPage />} />
            <Route path="/checkbox" element={<CheckboxPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
