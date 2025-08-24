import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal Component', () => {
    let handleClose: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      cleanup();
      handleClose = vi.fn();

    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'portal-root');
    document.body.appendChild(portalRoot);
  });

  it('renders children when open', () => {
    render(
      <Modal isOpen={true} handleClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} handleClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText('Modal Content')).toBeNull();
  });

  it('calls handleClose on close button click', () => {
    render(
      <Modal isOpen={true} handleClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByText('×'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls handleClose on overlay click', () => {
    render(
      <Modal isOpen={true} handleClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByTestId('modal-content'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call handleClose on modal content click', () => {
    render(
      <Modal isOpen={true} handleClose={handleClose}>
        <div data-testid="modal-content1">Modal Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByTestId('modal-content1'));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls handleClose on ESC key press', () => {
    render(
      <Modal isOpen={true} handleClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
