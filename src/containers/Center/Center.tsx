import React, { useState } from 'react';
import { LeftBar, RightBar, Workplace } from '..';
import { CreateProject } from '../../modals/CreateProject';
import { useRaxy } from '../../store/store';
import { Box } from './Center.styles';

export const Center = () => {

    const { state: { projectName } } = useRaxy(store => ({ projectName: store.project.name }));

    const [modalIsOpen, setModalIsOpen] = useState(!projectName);

    return (
        <Box>
            {
                !modalIsOpen && <>
                    <LeftBar />
                    <Workplace />
                    <RightBar />
                </> || <CreateProject isOpen={modalIsOpen} onClose={setModalIsOpen} />
            }
        </Box>
    );
}