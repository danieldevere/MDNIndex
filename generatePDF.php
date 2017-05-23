<?php
require('fpdf/fpdf.php');
/*if(isset($_POST['data'])) {
    $data = json_decode($_POST['data']);
}
if(isset($_POST['headers'])) {
    $header = json_decode($_POST['headers']);
}*/
$data = array(
    array('no' => '1', 'subject' => 'Accidents', 'headline' => 'Car Accidents', 'date' => '01/01/1990', 'page' => '1'),
    array('no' => '2', 'subject' => 'Library', 'headline' => 'Grace A. Dow', 'date' => '02/02/2000', 'page' => '2')
);
$header = array('No.', 'Subject', 'Headline', 'Date', 'Page');
class PDF extends FPDF
{
    // Load data
    function LoadData($file)
    {
        // Read file lines
        $lines = file($file);
        $data = array();
        foreach($lines as $line)
            $data[] = explode(';',trim($line));
        return $data;
    }

    // Simple table
    function BasicTable($header, $data)
    {
        // Header
        foreach($header as $col)
            $this->Cell(40,7,$col,1);
        $this->Ln();
        // Data
        foreach($data as $row)
        {
            foreach($row as $col)
                $this->Cell(40,6,$col,1);
            $this->Ln();
        }
    }

    // Better table
    function ImprovedTable($header, $data)
    {
        // Column widths
        $w = array(10, 35, 40, 45, 30);
        // Header
        for($i=0;$i<count($header);$i++)
            $this->Cell($w[$i],7,$header[$i],1,0,'C');
        $this->Ln();
        // Data
        foreach($data as $row)
        {
            $this->Cell($w[0],6,$row['no'],'LR');
            $this->Cell($w[1],6,$row['subject'],'LR');
            $this->Cell($w[2],6,$row['headline'],'LR');
            $this->Cell($w[3],6,$row['date'],'LR');
            $this->Cell($w[4],6,$row['page'],'LR');
            $this->Ln();
        }
        // Closing line
   //     $this->Cell(array_sum($w),0,'','T');
    }

    // Colored table
    function FancyTable($header, $data)
    {
        // Colors, line width and bold font
        $this->SetFillColor(255,0,0);
        $this->SetTextColor(255);
        $this->SetDrawColor(128,0,0);
        $this->SetLineWidth(.3);
        $this->SetFont('','B');
        // Header
        $w = array(40, 35, 40, 45);
        for($i=0;$i<count($header);$i++)
            $this->Cell($w[$i],7,$header[$i],1,0,'C',true);
        $this->Ln();
        // Color and font restoration
        $this->SetFillColor(224,235,255);
        $this->SetTextColor(0);
        $this->SetFont('');
        // Data
        $fill = false;
        foreach($data as $row)
        {
            $this->Cell($w[0],6,$row[0],'LR',0,'L',$fill);
            $this->Cell($w[1],6,$row[1],'LR',0,'L',$fill);
            $this->Cell($w[2],6,number_format($row[2]),'LR',0,'R',$fill);
            $this->Cell($w[3],6,number_format($row[3]),'LR',0,'R',$fill);
            $this->Ln();
            $fill = !$fill;
        }
        // Closing line
        $this->Cell(array_sum($w),0,'','T');
    }
}
if(isset($header) && isset($data)) {
    $pdf = new PDF();
    // Column headings
    // Data loading
    $pdf->SetFont('Arial','',14);
 //   $pdf->AddPage();
  //  $pdf->BasicTable($header,$data);
    $pdf->AddPage();
    $pdf->ImprovedTable($header,$data);
//    $pdf->AddPage();
 //   $pdf->FancyTable($header,$data);
    $pdf->Output();
}

?>