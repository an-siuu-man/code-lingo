import React, { useEffect, useState } from 'react';

const OP_STYLES = {
  VAR_DECLARE: { badge: 'DECLARE', color: '#4CAF50' },
  VAR_UPDATE: { badge: 'UPDATE', color: '#1e90ff' },
  FUNCT_DEFINE: { badge: 'FUNCTION', color: '#c084fc' },
  IF_BLOCK: { badge: 'IF', color: '#FCA204' },
  ELSEIF_BLOCK: { badge: 'ELSE IF', color: '#FCA204' },
  ELSE_BLOCK: { badge: 'ELSE', color: '#FCA204' },
  FOR_LOOP: { badge: 'FOR', color: '#FF6B6B' },
  WHILE_LOOP: { badge: 'WHILE', color: '#FF6B6B' },
  BREAK: { badge: 'BREAK', color: '#ce0505' },
  CONTINUE: { badge: 'CONTINUE', color: '#ce0505' },
};
const DEFAULT_STYLE = { badge: 'STEP', color: '#FF6B6B' };

const VisualizationPage = ({ saxx }) => {
  const [variables, setVariables] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedReference, setHighlightedReference] = useState(null);

  const totalSteps = saxx?.executionSteps?.length ?? 0;

  useEffect(() => {
    setVariables({});
    setCurrentStep(0);
    setHighlightedReference(null);
  }, [saxx]);

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
            operation,
          };
        } else if (operation === 'VAR_UPDATE' && updatedVars[reference]) {
          updatedVars[reference].label = `${name} = ${new_value}`;
          updatedVars[reference].operation = operation;
        } else if (operation === 'IF_BLOCK') {
          updatedVars[reference] = {
            label: `IF (${condition}: ${executed === 'True' ? 'Executed' : 'Not Executed'})`,
            scope,
            operation,
          };
        } else if (operation === 'ELSEIF_BLOCK') {
          updatedVars[reference] = {
            label: `ELSE IF (${condition}: ${executed === 'True' ? 'Executed' : 'Not Executed'})`,
            scope,
            operation,
          };
        } else if (operation === 'ELSE_BLOCK') {
          updatedVars[reference] = {
            label: `ELSE: ${executed === 'True' ? 'Executed' : 'Not Executed'}`,
            scope,
            operation,
          };
        } else if (operation === 'FOR_LOOP') {
          updatedVars[reference] = {
            label: `FOR (${condition}: ${result ? 'Continued' : 'Terminated'})`,
            scope,
            operation,
          };
        } else if (operation === 'WHILE_LOOP') {
          updatedVars[reference] = {
            label: `WHILE (${condition}: ${result ? 'Continued' : 'Terminated'})`,
            scope,
            operation,
          };
        } else if (operation === 'BREAK') {
          updatedVars[reference] = {
            label: `BREAK: Loop terminated`,
            scope,
            operation,
          };
        } else if (operation === 'CONTINUE') {
          updatedVars[reference] = {
            label: `CONTINUE: Loop iteration skipped`,
            scope,
            operation,
          };
        }

        return updatedVars;
      });

      setHighlightedReference(reference);
      setTimeout(() => setHighlightedReference(null), 1500);
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

  const renderVariables = (scope = "__SCOPE__GLOBAL__", depth = 0) => {
    return Object.entries(variables)
      .filter(([, varData]) => varData.scope === scope)
      .map(([key, varData]) => {
        const style = OP_STYLES[varData.operation] || DEFAULT_STYLE;
        const isHighlighted = highlightedReference === key;
        return (
          <div
            key={key}
            className={`variable-box ${isHighlighted ? 'highlight step-pulse' : ''}`}
            style={{ '--accent': style.color, marginLeft: depth ? '18px' : 0 }}
          >
            <span className="variable-badge" style={{ backgroundColor: style.color }}>
              {style.badge}
            </span>
            <span className="variable-label">{varData.label}</span>
            {renderVariables(key, depth + 1)}
          </div>
        );
      });
  };

  const hasVariables = Object.keys(variables).length > 0;

  return (
    <div style={{ padding: '20px' }}>
      <div className="flex items-center justify-between mb-4">
        <h1 className='text-2xl font-[poppins] font-[700]'>Execution Visualization</h1>
        {totalSteps > 0 && (
          <span className="text-sm font-[source] text-[#bbbbbb]">
            Step {Math.min(currentStep, totalSteps)} / {totalSteps}
          </span>
        )}
      </div>
      {totalSteps > 0 && (
        <div className="progress-track">
          <div
            className="progress-fill progress-stripes"
            style={{ width: `${Math.min(100, (currentStep / totalSteps) * 100)}%` }}
          />
        </div>
      )}
      <div className="visualization-container styled-scrollbar">
        {hasVariables ? (
          renderVariables()
        ) : (
          <p className="text-[#888] font-[source] text-sm italic px-2 py-4">
            {totalSteps > 0 ? 'Waiting for the first step to execute…' : 'Run your code to see it come to life here.'}
          </p>
        )}
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
          .progress-track {
            width: 100%;
            height: 6px;
            border-radius: 4px;
            background-color: rgba(255, 255, 255, 0.08);
            overflow: hidden;
            margin-bottom: 16px;
          }
          .progress-fill {
            height: 100%;
            background-color: #FF6B6B;
            border-radius: 4px;
            transition: width 0.4s ease;
          }
          .visualization-container {
            display: flex;
            background-color: #1b1b1b;
            border: 1px solid rgba(255, 255, 255, 0.06);
            overflow-y: auto;
            max-height: 450px;
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
            padding: 16px;
            border-radius: 8px;
          }
          .variable-box {
            position: relative;
            background-color: #2a2a2a;
            color: #f2f2f2;
            padding: 10px 14px;
            border-radius: 6px;
            border-left: 3px solid var(--accent, #ff6b6b);
            font-family: 'Source Code Pro', monospace;
            font-size: 15px;
            font-weight: 500;
            display: flex;
            flex-direction: column;
            gap: 6px;
            transition: background-color 0.3s ease, transform 0.2s ease;
          }
          .variable-box.highlight {
            background-color: #33422f;
            transform: translateX(2px);
          }
          .variable-badge {
            display: inline-block;
            width: fit-content;
            font-family: 'Poppins', sans-serif;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.05em;
            color: #1d1f21;
            padding: 2px 8px;
            border-radius: 999px;
          }
          .variable-label {
            word-break: break-word;
          }
        `}
      </style>
      <VisualizationPage saxx={parsedData} />
    </>
  );
};

export default VisualizationPageStyled;
