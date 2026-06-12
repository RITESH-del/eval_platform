import { Loader } from '@mantine/core';

export default function Spinner() {
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Loader color="gray" />
        </div>
    );
}