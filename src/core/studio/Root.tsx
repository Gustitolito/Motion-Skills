import React from 'react';
import { Composition, Folder } from 'remotion';
import { activeProjects } from '../registry/projects-registry';
import '../../styles/index.css';

export const Root: React.FC = () => {
  return (
    <>
      {activeProjects.map((project) => (
        <Folder key={project.config.id} name={project.config.id}>
          {project.compositions.map((comp) => (
            <Composition
              key={comp.id}
              id={comp.id}
              lazyComponent={comp.component}
              durationInFrames={comp.durationInFrames}
              fps={comp.fps}
              width={comp.width}
              height={comp.height}
              defaultProps={comp.defaultProps}
              calculateMetadata={comp.calculateMetadata}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              schema={comp.schema as any}
            />
          ))}
        </Folder>
      ))}
    </>
  );
};
