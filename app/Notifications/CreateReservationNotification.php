<?php
namespace App\Notifications;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
class CreateReservationNotification extends Notification
{
 use Queueable;
/** @var Loan */
 public $loan;
/**
 * @param Loan $loan
 */
 public function __construct($loan)
 {
 $this->loan = $loan;
 }
/**
 * Get the notification’s delivery channels.
 *
 * @param mixed $notifiable
 * @return array
 */
 public function via($notifiable)
 {
 return ['mail'];
 }
/**
 * Get the mail representation of the notification.
 *
 * @param mixed $notifiable
 * @return \Illuminate\Notifications\Messages\MailMessage
 */
 public function toMail($notifiable)
 {
 return (new MailMessage)
 ->subject('votre demande est apprevue!')
 ->markdown('mails.application_sent', [
 'loan' => $this->loan
 ]);
 }
}