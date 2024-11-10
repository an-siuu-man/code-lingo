import React, { useEffect, useState } from 'react';

const VisualizationPage = ({ saxx }) => {
  const [variables, setVariables] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedReference, setHighlightedReference] = useState(null);

  useEffect(() => {
    if (!saxx || !Array.isArray(saxx.executionSteps) || saxx.executionSteps.length === 0) {
      console.warn('No execution steps found in data');
      return;
    }

    const processStep = (step) => {
      const { operation, reference, name, value, new_value, condition, executed, scope, result } = step;
      setVariables((prevVars) => {
        const updatedVars = { ...prevVars };

        if (operation === 'VAR_DECLARE' || operation === 'FUNCT_DEFINE') {
          updatedVars[reference] = {
            label: `${name} = ${value ?? ''}`,
            scope,
          };
        } else if (operation === 'VAR_UPDATE' && updatedVars[reference]) {
          updatedVars[reference].label = `${name} = ${new_value}`;
        } else if (operation === 'IF_BLOCK') {
          updatedVars[reference] = {
            label: `IF (${condition}: ${executed === 'True' ? 'Executed' : 'Not Executed'})`,
            scope,
          };
        } else if (operation === 'ELSEIF_BLOCK') {
          updatedVars[reference] = {
            label: `ELSE IF (${condition}: ${executed === 'True' ? 'Executed' : 'Not Executed'})`,
            scope,
          };
        } else if (operation === 'ELSE_BLOCK') {
          updatedVars[reference] = {
            label: `ELSE: ${executed === 'True' ? 'Executed' : 'Not Executed'}`,
            scope,
          };
        } else if (operation === 'FOR_LOOP') {
          updatedVars[reference] = {
            label: `FOR (${condition}: ${result ? 'Continued' : 'Terminated'})`,
            scope,
          };
        } else if (operation === 'WHILE_LOOP') {
          updatedVars[reference] = {
            label: `WHILE (${condition}: ${result ? 'Continued' : 'Terminated'})`,
            scope,
          };
        } else if (operation === 'BREAK') {
          updatedVars[reference] = {
            label: `BREAK: Loop terminated`,
            scope,
          };
        } else if (operation === 'CONTINUE') {
          updatedVars[reference] = {
            label: `CONTINUE: Loop iteration skipped`,
            scope,
          };
        }

        return updatedVars;
      });

      setHighlightedReference(reference);
      setTimeout(() => setHighlightedReference(null), 1000);
    };

    const interval = setInterval(() => {
      if (currentStep < saxx.executionSteps.length) {
        processStep(saxx.executionSteps[currentStep]);
        setCurrentStep((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStep, saxx]);

  const renderVariables = (scope = "__SCOPE__GLOBAL__") => {
    return Object.entries(variables)
      .filter(([, varData]) => varData.scope === scope)
      .map(([key, varData]) => (
        <div
          key={key}
          className={`variable-box ${highlightedReference === key ? 'highlight' : ''}`}
        >
          <div>{varData.label}</div>
          {renderVariables(key)}
        </div>
      ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 className='text-center text-2xl font-[poppins] font-[700] pb-4'>Execution Visualization</h1>
      <div className="visualization-container">
        {renderVariables()}
      </div>
    </div>
  );
};

const VisualizationPageStyled = ({ data }) => {
  // Check if `data` is a string and try to parse it
  let parsedData = data;
  if (typeof data === 'string') {
    try {
      parsedData = JSON.parse(data);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      parsedData = {}; // Fallback to empty object if parsing fails
    }
  }

  return (
    <>
      <style>
        {`
          .visualization-container {
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 10px;
            background-color: #f0f0f0;
            padding: 20px;
            border-radius: 8px;
          }
          .variable-box {
            background-color: #333;
            color: #fff;
            padding: 10px;
            border: 1px solid white;
            border-radius: 4px;
            font-family: monospace;
            font-size: 14px;
            margin-left: 20px;
            transition: background-color 0.5s ease;
          }
          .variable-box.highlight {
            background-color: #4CAF50;
          }
        `}
      </style>
      <VisualizationPage saxx={parsedData} />
    </>
  );
};

export default VisualizationPageStyled;
